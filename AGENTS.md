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

-   **Next.js** → framework principal para frontend y backend (fullstack
    React + API routes)\
-   **Tailwind CSS** → diseño rápido y consistente de la interfaz\
-   **Shadcn** → sistema de componentes UI accesibles y personalizables\
-   **Prisma** → ORM para modelado y acceso a base de datos\
-   **PostgreSQL** → base de datos relacional principal

------------------------------------------------------------------------

## Futuras extensiones (TBD)

-   Implementación de un motor de **matching inteligente** con IA (ej.
    embeddings para similitud de perfiles).\
-   Integración de **sistema de mensajería** o agendado de reuniones
    dentro de la app.\
-   Visualizaciones para **mapa de networking** en la conferencia.
