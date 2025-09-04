# Configuración de Autenticación con Google

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_database_url
```

## Configuración en Supabase

### 1. Crear un proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia la URL del proyecto y la clave anónima desde la configuración del proyecto

### 2. Configurar autenticación con Google
1. En el dashboard de Supabase, ve a **Authentication** > **Providers**
2. Habilita **Google** como proveedor
3. Configura las credenciales de Google OAuth:
   - **Client ID**: Obtén esto desde [Google Cloud Console](https://console.cloud.google.com)
   - **Client Secret**: Obtén esto desde Google Cloud Console
4. Configura la URL de redirección autorizada:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```

### 3. Configurar Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ (o Google Identity)
4. Ve a **Credenciales** > **Crear credenciales** > **ID de cliente OAuth 2.0**
5. Configura la pantalla de consentimiento OAuth
6. Agrega las siguientes URLs de redirección autorizadas:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback (para desarrollo)
   ```

## Funcionalidades Implementadas

### Componentes Creados
- `GoogleLoginButton`: Botón para iniciar sesión con Google
- `LogoutButton`: Botón para cerrar sesión
- `Header`: Header con estado de autenticación
- `LoginPage`: Página de login

### Páginas Creadas
- `/auth/login`: Página de login
- `/auth/callback`: Callback para OAuth
- `/auth/auth-code-error`: Página de error de autenticación

### Hooks
- `useAuth`: Hook para manejar el estado de autenticación

### Middleware
- Middleware configurado para proteger rutas y redirigir a login cuando sea necesario

## Uso

1. Configura las variables de entorno
2. Configura Supabase y Google OAuth
3. Ejecuta `npm run dev`
4. Navega a cualquier ruta protegida y serás redirigido al login
5. Haz clic en "Continuar con Google" para iniciar sesión

## Rutas Protegidas

Por defecto, todas las rutas excepto `/`, `/auth/*`, `/_next/*` y `/api/*` están protegidas y requieren autenticación.
