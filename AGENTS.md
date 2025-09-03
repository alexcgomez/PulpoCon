# AGENTS.md

## Descripción del proyecto

Este proyecto es un **recomendador de networking** diseñado para
conferencias de varios días (ejemplo: 5 días).

El flujo principal es:\
1. Los asistentes **suben su CV**.\
2. La aplicación **analiza el CV** y extrae información relevante
(habilidades, experiencia, intereses).\
3. El sistema genera **recomendaciones personalizadas** de otras
personas con las que el usuario podría conectar durante el evento.\
4. Los usuarios pueden **consultar su perfil** y visualizar sugerencias
de contactos.

El objetivo es **facilitar interacciones significativas** durante la
conferencia.

------------------------------------------------------------------------

## Arquitectura

La aplicación sigue un enfoque inspirado en **Clean Architecture /
Hexagonal**, con separación clara por capas:

-   **Presentation**
    -   Componentes de interfaz de usuario (UI)\
    -   Hooks de estado y lógica de presentación
    -   Páginas organizadas en `src/presentation/pages/{nombre-de-la-page}`
    -   Componentes UI reutilizables en `src/presentation/components/ui`
-   **Application**
    -   Casos de uso de la aplicación (ej. *UploadCVUseCase*,
        *GenerateNetworkingRecommendationsUseCase*,
        *ConsultProfileUseCase*)
-   **Domain**
    -   Entidades principales (ej. *Attendee*, *Profile*, *CVData*,
        *Recommendation*)\
    -   Interfaces de repositorios
-   **Infrastructure**
    -   Implementaciones de persistencia (ej. base de datos con Prisma +
        PostgreSQL)\
    -   Controladores y servicios externos (ej. extracción de texto de
        CV, procesamiento semántico con IA)
-   **Testing**
    -   Tests unitarios\
    -   Tests de integración\
    -   Tests end-to-end

------------------------------------------------------------------------

## Stack tecnológico

El stack base de la aplicación es:

-   **Next.js 15.5.2** → framework principal para frontend y backend (fullstack
    React + API routes)\
-   **TypeScript** → tipado estático para mayor robustez del código
-   **Tailwind CSS v4** → diseño rápido y consistente de la interfaz\
-   **Shadcn/ui** → sistema de componentes UI accesibles y personalizables\
-   **Prisma** → ORM para modelado y acceso a base de datos\
-   **PostgreSQL** → base de datos relacional principal

------------------------------------------------------------------------

## Estructura del proyecto

```
src/
├── app/                    # Next.js App Router (solo imports)
│   ├── page.tsx          # Importa HomePage de presentation
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Estilos globales
├── presentation/          # Capa de presentación
│   ├── components/       # Componentes UI reutilizables
│   │   └── ui/          # Componentes de Shadcn/ui
│   ├── pages/           # Páginas de la aplicación
│   │   ├── home/        # Página principal
│   │   ├── upload-cv/   # Subida de CV
│   │   ├── profile/     # Perfil del usuario
│   │   └── recommendations/ # Recomendaciones
│   └── lib/             # Utilidades de presentación
├── domain/               # Entidades y lógica de negocio
│   ├── entities/        # Entidades principales
│   └── repositories/    # Interfaces de repositorios
├── application/          # Casos de uso
│   └── use-cases/       # Implementación de casos de uso
├── infrastructure/       # Implementaciones técnicas
│   ├── database/        # Configuración de base de datos
│   └── services/        # Servicios externos
└── __tests__/           # Tests organizados por tipo
    ├── unit/            # Tests unitarios
    ├── integration/     # Tests de integración
    └── e2e/            # Tests end-to-end
```

## Estado actual del proyecto

### ✅ Completado
- [x] Proyecto Next.js inicializado con TypeScript y Tailwind CSS
- [x] Shadcn/ui configurado y funcionando
- [x] Estructura de directorios siguiendo Clean Architecture
- [x] Esquema de Prisma con modelos principales:
  - Attendee (asistentes)
  - Profile (perfiles)
  - CVData (datos de CV)
  - Recommendation (recomendaciones)
- [x] Página principal (HomePage) creada en presentation/pages/home
- [x] Página de subida de CV (UploadCVPage) creada en presentation/pages/upload-cv
- [x] App Router configurado para importar solo componentes de presentation

### 🔄 En progreso
- [ ] Configuración de base de datos PostgreSQL
- [ ] Implementación de entidades del dominio
- [ ] Casos de uso básicos
- [ ] API routes para funcionalidades principales

### 📋 Pendiente
- [ ] Páginas de perfil y recomendaciones
- [ ] Sistema de autenticación
- [ ] Procesamiento de CV con IA
- [ ] Algoritmo de matching para recomendaciones
- [ ] Tests unitarios e integración
- [ ] Despliegue y configuración de producción

------------------------------------------------------------------------

## Futuras extensiones (TBD)

-   Implementación de un motor de **matching inteligente** con IA (ej.
    embeddings para similitud de perfiles).\
-   Integración de **sistema de mensajería** o agendado de reuniones
    dentro de la app.\
-   Visualizaciones para **mapa de networking** en la conferencia.

------------------------------------------------------------------------

## Comandos útiles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Base de datos
npm run db:generate    # Generar cliente Prisma
npm run db:push        # Sincronizar esquema con BD
npm run db:migrate     # Ejecutar migraciones
npm run db:studio      # Abrir Prisma Studio

# Tests
npm test               # Ejecutar tests
npm run test:watch     # Tests en modo watch
npm run test:coverage  # Cobertura de tests
```
