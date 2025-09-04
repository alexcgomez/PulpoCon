# Base de Datos PulpoCon

## Configuración con Docker Compose

### Requisitos
- Docker
- Docker Compose

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con:

```bash
# Database
DATABASE_URL="postgresql://pulpocon_user:pulpocon_password@localhost:5432/pulpocon?schema=public"

# Environment
NODE_ENV=development
```

### Iniciar la Base de Datos

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f postgres

# Verificar estado
docker-compose ps
```

### Acceder a la Base de Datos

#### PostgreSQL
- **Host**: localhost
- **Puerto**: 5432
- **Base de datos**: pulpocon
- **Usuario**: pulpocon_user
- **Contraseña**: pulpocon_password

#### PgAdmin (Interfaz Web)
- **URL**: http://localhost:8080
- **Email**: admin@pulpocon.com
- **Contraseña**: admin123

### Comandos Útiles

```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reiniciar solo PostgreSQL
docker-compose restart postgres

# Ejecutar migraciones de Prisma
npm run db:push

# Generar cliente Prisma
npm run db:generate

# Abrir Prisma Studio
npm run db:studio
```

### Estructura de la Base de Datos

#### Tablas Principales:
1. **`profiles`** - Perfiles de usuarios
2. **`cv`** - Archivos de CV
3. **`loopers`** - Personas que hacen recomendaciones
4. **`looper_recommendations`** - Recomendaciones generadas

#### Datos de Ejemplo:
La base de datos se inicializa automáticamente con:
- 5 Loopers de ejemplo (desarrolladores, data scientists, DevOps, etc.)
- 3 perfiles de usuarios de ejemplo
- 3 CVs de ejemplo
- 3 recomendaciones de ejemplo

### Solución de Problemas

#### Puerto 5432 ocupado:
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "5433:5432"  # Usar puerto 5433 en lugar de 5432
```

#### Error de conexión:
```bash
# Verificar que el contenedor esté corriendo
docker-compose ps

# Ver logs del contenedor
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart
```

#### Resetear base de datos:
```bash
# Detener y eliminar todo
docker-compose down -v

# Volver a iniciar
docker-compose up -d
```

