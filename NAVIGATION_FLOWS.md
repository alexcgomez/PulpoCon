# Flujos de Navegación de PulpoCon

## Descripción

Sistema de navegación inteligente que adapta la interfaz según el estado del usuario (autenticado/no autenticado) y si tiene perfil creado o no.

## Flujos Implementados

### 1. Usuario No Autenticado
**Ruta**: Cualquier ruta protegida
**Acción**: Redirección automática a `/auth/login`
**Comportamiento**: 
- Middleware detecta falta de autenticación
- Redirige a página de login con Google
- Usuario debe autenticarse para continuar

### 2. Usuario Autenticado SIN Perfil
**Ruta**: `/` (página principal)
**Vista**: Página de bienvenida con botón CTA
**Elementos**:
- Título de bienvenida
- Descripción de la plataforma
- **Único botón**: "Crear Perfil con IA"
- Sección "¿Cómo funciona?" con pasos
- Diseño centrado y minimalista

### 3. Usuario Autenticado CON Perfil
**Ruta**: `/` (página principal)
**Vista**: Dashboard personal con perfil completo
**Elementos**:
- **Perfil completo** con foto, nombre, título, empresa
- **Información detallada**: experiencia, intereses, extra
- **Estadísticas**: conexiones y recomendaciones (preparado para futuro)
- **Único botón de acción**: "Iniciar Chat de Networking"
- Diseño profesional y funcional

## Lógica de Implementación

### Página Principal (`src/app/page.tsx`)
```typescript
export default async function Home() {
  const user = await getUser();
  
  // 1. Verificar autenticación
  if (!user) {
    redirect('/auth/login');
  }

  const profile = await getUserProfile();

  // 2. Verificar si tiene perfil
  if (profile) {
    return <UserProfile profile={profile} />;
  }

  // 3. Mostrar página de bienvenida
  return <WelcomePage />;
}
```

### Funciones de Utilidad (`src/lib/profile.ts`)
- `getUserProfile()`: Obtiene perfil del usuario autenticado
- `hasUserProfile()`: Verifica si usuario tiene perfil

### Componentes
- `UserProfile`: Dashboard completo para usuarios con perfil
- `WelcomePage`: Página de bienvenida para usuarios sin perfil

## Rutas y Protección

### Rutas Públicas
- `/auth/login` - Página de login
- `/auth/callback` - Callback de OAuth
- `/auth/auth-code-error` - Página de error

### Rutas Protegidas
- `/` - Página principal (lógica condicional)
- `/chat` - Chat para crear perfil
- `/api/chat` - API del chat

### Middleware
- Protege rutas automáticamente
- Redirige usuarios no autenticados a login
- Permite acceso a rutas de autenticación

## Estados de la Aplicación

### Estado 1: No Autenticado
```
Usuario → Cualquier ruta → Middleware → /auth/login
```

### Estado 2: Autenticado, Sin Perfil
```
Usuario → / → Verificar perfil → Mostrar WelcomePage
```

### Estado 3: Autenticado, Con Perfil
```
Usuario → / → Verificar perfil → Mostrar UserProfile
```

## Experiencia de Usuario

### Flujo Completo
1. **Primera visita**: Login con Google
2. **Sin perfil**: Página de bienvenida con CTA claro
3. **Crear perfil**: Chat con IA (5-6 preguntas)
4. **Con perfil**: Dashboard personal con acciones

### Beneficios
- **Navegación intuitiva**: Cada estado tiene su interfaz específica
- **Progresión clara**: Usuario sabe exactamente qué hacer
- **Sin confusión**: Una sola acción principal por estado
- **Personalización**: Interfaz adaptada al estado del usuario

## Próximas Mejoras

- [ ] Edición de perfil existente
- [ ] Estadísticas reales de networking
- [ ] Historial de conversaciones
- [ ] Notificaciones de nuevas conexiones
- [ ] Exportación de perfil
