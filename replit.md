# Discord Team Role Bot

## Descripción
Bot de Discord que gestiona automáticamente roles de equipos. Asigna roles de "Equipo" aleatorios a nuevos miembros y elimina estos roles cuando un usuario recibe un rol de "Capitán".

## Estructura del Proyecto
```
.
├── index.js          # Archivo principal del bot
├── package.json      # Dependencias y configuración del proyecto
├── .gitignore        # Archivos a ignorar en git
└── replit.md         # Este archivo
```

## Funcionalidades

### 1. Servidor Keep-Alive
- Servidor Express en puerto 5000 para mantener el bot activo
- Endpoint `/` que responde con "✅ Bot activo"

### 2. Asignación Automática de Roles de Equipo
- Detecta cuando un nuevo miembro se une al servidor
- Filtra roles que empiezan con "Equipo "
- Asigna un rol aleatorio de equipo al nuevo miembro

### 3. Gestión de Roles de Capitán
- Monitorea cambios en los roles de los miembros
- Cuando un usuario recibe un rol que empieza con "Capitán"
- Elimina automáticamente todos los roles que empiezan con "Equipo "

## Configuración

### Variables de Entorno Requeridas
- `DISCORD_TOKEN`: Token del bot de Discord (proporcionado por la integración)
- `PORT`: Puerto para el servidor Express (por defecto: 5000)

### Intents de Discord Requeridos
- `Guilds`: Para acceder a información del servidor
- `GuildMembers`: Para detectar nuevos miembros y cambios de roles

## Dependencias
- `express`: Servidor web para keep-alive
- `discord.js`: Librería para interactuar con la API de Discord

## Requisitos del Servidor Discord

### Convenciones de Nomenclatura de Roles
Para que el bot funcione correctamente, el servidor de Discord debe seguir estas convenciones:
- **Roles de Equipo**: Deben empezar con "Equipo " (nota el espacio después)
  - Ejemplos: "Equipo Rojo", "Equipo Azul", "Equipo Verde"
- **Roles de Capitán**: Deben empezar con "Capitán" (nota el espacio después)
  - Ejemplos: "Capitán Rojo", "Capitán Azul", "Capitán Verde"

### Permisos Requeridos
- El bot debe tener el permiso "Gestionar Roles" (`MANAGE_ROLES`)
- El rol del bot en la jerarquía del servidor **debe estar por encima** de todos los roles que va a asignar o quitar
- Habilitar el intent "Server Members Intent" en el Discord Developer Portal

## Logs
El bot proporciona logs detallados:
- ✅ Confirmación de inicio del servidor Express
- ✅ Confirmación de bot listo
- 🎯 Asignación exitosa de roles de equipo
- 🚫 Eliminación de roles de equipo
- ⚠️ Advertencias (ej: no hay roles de equipo)
- ❌ Errores en operaciones

## Notas de Monitoreo
- El bot utiliza eventos en caché de Discord.js
- En producción, monitorea los logs para confirmar que `guildMemberUpdate` siempre recibe miembros en caché
- Si encuentras problemas con partials, considera habilitar member partials en la configuración del cliente

## Cómo Configurar el Bot en Discord

### 1. Crear la Aplicación del Bot
1. Ve al [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en "New Application" y dale un nombre
3. En la sección "Bot", haz clic en "Add Bot"
4. Copia el token y guárdalo en los secretos de Replit como `DISCORD_TOKEN`

### 2. Habilitar Intents Privilegiados
1. En el Discord Developer Portal, ve a tu aplicación
2. Navega a la sección "Bot"
3. Desplázate hasta "Privileged Gateway Intents"
4. **Habilita** "SERVER MEMBERS INTENT" (requerido para detectar nuevos miembros)

### 3. Invitar el Bot a tu Servidor
1. En el Developer Portal, ve a "OAuth2" > "URL Generator"
2. Selecciona los scopes: `bot`
3. Selecciona los permisos: `Manage Roles`
4. Copia la URL generada y ábrela en tu navegador
5. Selecciona tu servidor y autoriza el bot

### 4. Configurar Jerarquía de Roles
1. En tu servidor de Discord, ve a Configuración del Servidor > Roles
2. Asegúrate de que el rol del bot esté **por encima** de los roles "Equipo " y "Capitán"
3. Arrastra el rol del bot hacia arriba en la lista si es necesario

## Fecha de Creación
Noviembre 9, 2025
