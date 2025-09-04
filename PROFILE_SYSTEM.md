# Sistema de Perfiles Profesionales

## Descripción

Sistema completo para crear y gestionar perfiles profesionales para networking en conferencias, integrado con autenticación de Google y base de datos Supabase.

## Arquitectura

### Base de Datos
- **Tabla única**: `profiles`
- **ORM**: Prisma con PostgreSQL (Supabase)
- **Autenticación**: Supabase Auth con Google OAuth

### Estructura del Perfil

```typescript
interface Profile {
  id: string;          // ID único generado por Prisma
  name: string;        // Nombre completo (de Google)
  email: string;       // Email (de Google)
  avatar: string;      // URL de foto de perfil (de Google)
  title: string;       // Puesto o cargo actual
  company: string;     // Empresa donde trabaja
  experience: string;  // Descripción de experiencia
  interests: string[]; // Array de intereses profesionales
  extra: string;       // Información adicional (hobbies, etc.)
  created_at: DateTime; // Timestamp de creación
  updated_at: DateTime; // Timestamp de última actualización
}
```

## Flujo de Creación de Perfil

### 1. Autenticación
- Usuario hace login con Google
- Se obtiene automáticamente: nombre, email, avatar

### 2. Chat con IA
- IA saluda personalmente usando el nombre del usuario
- Hace 5-6 preguntas específicas:
  - Puesto o cargo actual
  - Empresa donde trabaja
  - Experiencia profesional
  - Intereses profesionales
  - Algo extra que quiera mencionar

### 3. Guardado en Base de Datos
- Tool `createProfile` combina datos de Google + respuestas
- Usa `upsert` para crear o actualizar perfil
- Manejo de errores robusto

### 4. Visualización
- ProfileBadge muestra el perfil completo
- Incluye foto de Google, información profesional
- Diseño atractivo con tema oscuro

## Archivos Principales

### Backend
- `src/app/api/chat/route.ts` - API del chat con tool de creación
- `src/lib/prisma.ts` - Cliente de Prisma
- `src/lib/supabase/server.ts` - Cliente de Supabase para servidor

### Frontend
- `src/app/page.tsx` - Página principal con CTA
- `src/app/chat/page.tsx` - Interfaz del chat
- `src/presentation/components/ProfileBadge.tsx` - Componente del perfil

### Base de Datos
- `prisma/schema.prisma` - Esquema de la base de datos
- `prisma/migrations/` - Migraciones de la base de datos

## Configuración Requerida

### Variables de Entorno
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=tu_clave_anonima

# Base de datos
DATABASE_URL=tu_url_de_postgresql

# OpenAI
OPENAI_API_KEY=tu_clave_de_openai
```

### Configuración de Supabase
1. Crear proyecto en Supabase
2. Configurar Google OAuth
3. Obtener URL y clave anónima
4. Configurar PostgreSQL

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Base de datos
npx prisma generate          # Generar cliente
npx prisma migrate dev       # Crear migración
npx prisma db push          # Sincronizar esquema
npx prisma studio           # Abrir interfaz visual

# Build
npm run build
```

## Características Técnicas

### Seguridad
- Autenticación obligatoria con Supabase
- Validación de datos con Zod
- Manejo seguro de errores

### Performance
- Upsert para evitar duplicados
- Cliente de Prisma optimizado
- Streaming de respuestas de IA

### UX/UI
- Proceso rápido (5-6 preguntas)
- Saludo personalizado
- Badge visual atractivo
- Tema oscuro consistente

## Próximas Mejoras

- [ ] Sistema de recomendaciones basado en perfiles
- [ ] Edición de perfiles existentes
- [ ] Exportación de perfiles
- [ ] Integración con LinkedIn
- [ ] Analytics de networking
