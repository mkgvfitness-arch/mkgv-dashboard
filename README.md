# MKGV Dashboard

Panel de gestion de negocio: clientes, ventas, productos/servicios y gastos.
Base creada con **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma + PostgreSQL**.

## Estructura del proyecto

```
mkgv-dashboard/
  prisma/
    schema.prisma      # Modelos: Cliente, Producto, Venta, Gasto
    seed.ts            # Datos de ejemplo
  src/
    app/
      page.tsx          # Panel principal (resumen del negocio)
      clientes/         # Listado + alta de clientes
      productos/         # Listado + alta de productos/servicios
      ventas/            # Listado + alta de ventas
      gastos/            # Listado + alta de gastos
      api/               # Endpoints REST (clientes, productos, ventas, gastos)
    components/          # Sidebar, formularios, tarjetas de estadisticas
    lib/                 # Cliente de Prisma y utilidades de formato
  docker-compose.yml     # PostgreSQL local para desarrollo
  .env.example           # Variables de entorno necesarias
```

## 1. Requisitos previos

- Node.js 18.18 o superior
- npm
- Docker Desktop (opcional, para levantar PostgreSQL en local) o una base de datos PostgreSQL en la nube (Supabase, Neon, Railway...)
- Visual Studio Code
- Una cuenta de GitHub

## 2. Abrir el proyecto en VS Code

1. Abre VS Code.
2. `Archivo > Abrir carpeta...` y selecciona la carpeta `mkgv-dashboard`.
3. Abre una terminal integrada (`Ctrl + ñ` o `Terminal > Nueva terminal`).

## 3. Instalar dependencias

En la terminal de VS Code:

```bash
npm install
```

## 4. Configurar la base de datos

1. Copia el archivo de ejemplo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

2. Elige una opcion:

   **Opcion A - PostgreSQL local con Docker (recomendado para empezar):**

   ```bash
   docker compose up -d
   ```

   Esto levanta una base de datos en `localhost:5432` con usuario `mkgv`, contraseña `mkgv` y base de datos `mkgv_dashboard` (coincide con el `.env.example`).

   **Opcion B - Base de datos en la nube (Supabase / Neon / Railway):**

   Crea un proyecto gratuito en cualquiera de esos servicios, copia la cadena de conexion que te den y pegala en `.env` como `DATABASE_URL`.

3. Crea las tablas a partir del esquema de Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

4. (Opcional) Carga datos de ejemplo para ver el panel funcionando:

   ```bash
   npm run db:seed
   ```

## 5. Arrancar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. Veras el panel con clientes, ventas, productos y gastos ya conectado a la base de datos.

Otros comandos utiles:

```bash
npx prisma studio     # interfaz visual para ver/editar los datos de la base de datos
npm run lint           # revisa el codigo
npm run build           # genera la version de produccion
```

## 6. Inicializar git y subir el proyecto a GitHub

Esta carpeta vive dentro de Google Drive, asi que no trae un repositorio git inicializado (evita problemas de sincronizacion). Se hace en un momento desde la terminal de VS Code:

```bash
git init
git add -A
git commit -m "Primer commit: base del panel de gestion"
git branch -M main
```

Despues:

1. Ve a [github.com/new](https://github.com/new) y crea un repositorio nuevo (por ejemplo `mkgv-dashboard`), **sin** marcar "Add a README" (ya tenemos uno).
2. Conecta y sube el proyecto:

   ```bash
   git remote add origin https://github.com/TU_USUARIO/mkgv-dashboard.git
   git push -u origin main
   ```

3. Listo: el codigo quedara en GitHub y podras seguir haciendo commits normalmente desde VS Code (icono de "Control de codigo fuente" en la barra lateral).

## 7. Como esta pensado para crecer

Este es el punto de partida. Ideas para ampliar segun lo que necesite el negocio:

- Autenticacion (login) con NextAuth para proteger el panel.
- Graficos de ingresos/gastos por mes (la libreria `recharts` ya esta instalada).
- Edicion y borrado de clientes/productos/ventas/gastos (de momento solo hay alta y listado).
- Ventas con varias lineas de producto (actualmente cada venta es de un solo producto; el esquema de Prisma se puede ampliar a una tabla `VentaItem`).
- Exportar informes a Excel/PDF.
- Roles de usuario (admin, empleado).

## Notas

- La base de datos elegida es **PostgreSQL** por ser robusta y escalar bien a produccion. Si prefieres algo mas simple para probar sin instalar nada, se puede cambiar el `provider` de Prisma a `sqlite` (avisame si quieres que lo prepare asi).
- Este proyecto se genero sin ejecutar `npm install` ni `git init` (el entorno donde se creo no tiene acceso a internet ni puede escribir directamente en Google Drive), por eso esos dos pasos se hacen la primera vez que abras el proyecto en tu ordenador.
