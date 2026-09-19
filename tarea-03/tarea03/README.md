# Tarea 3 — i18n (Opción 2)

Se agregó internacionalización (i18n) al proyecto de Katwil (Registro de
Placas y Conductores), con un cuestionario de 3 preguntas disponible en
español e inglés.

## Qué se agregó sobre la tarea 2

- `frontend/src/i18n/` — configuración de `vue-i18n` y los textos en
  `locales/es.json` y `locales/en.json`
- `frontend/src/views/CuestionarioView.vue` — el cuestionario de 3 preguntas,
  con botones ES/EN para cambiar el idioma
- Nueva ruta `/cuestionario` en `router.js`, accesible desde el Sidebar y
  desde la tarjeta de Inicio

## Cómo funciona el idioma

El idioma inicial se toma del parámetro `?lang=` en la URL, por ejemplo:

- `http://localhost:5173/cuestionario?lang=es`
- `http://localhost:5173/cuestionario?lang=en`

Si no se envía el parámetro, el idioma por defecto es español. También se
puede cambiar desde los botones **ES / EN** dentro de la vista, sin recargar
la página; al cambiar, se actualiza el `?lang=` de la URL.

## Cómo correrlo

1. Base de datos: `createdb katwil`
2. Backend:
   ```
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
3. Frontend (otra terminal):
   ```
   cd frontend
   npm install
   npm run dev
   ```
4. Ir a `http://localhost:5173/cuestionario`

## Capturas de prueba

Agregar en `docs/`:
1. Cuestionario en español (`?lang=es`)
2. Cuestionario en inglés (`?lang=en`)
3. Mensaje de agradecimiento tras enviar el formulario
