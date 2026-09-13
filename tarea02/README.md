#  Registro de Placas y Conductores (Tarea 1 y 2)
# Desarrollo de Tarea 1 y Tarea 2

## Tarea 1 — Arquitectura en capas (n-capas)


**Distribución en el proyecto:**

| Capa | Carpeta | Responsabilidad |
|------|---------|------------------|
| Presentación | `frontend/src/views/`, `frontend/src/components/` | Interfaz de usuario, formularios, navegación |
| Lógica — HTTP | `backend/controllers/`, `backend/routes/` | Recibir peticiones, devolver respuestas |
| Lógica — Negocio | `backend/services/` | Validaciones, reglas, uso de funciones stateless/stateful |
| Acceso a datos | `backend/repositories/` | Consultas CRUD con Sequelize |
| Datos | `backend/models/` + PostgreSQL | Definición de tablas y persistencia |

Cada capa solo se comunica con la inmediata inferior (controller → service →
repository → model), lo que permite reemplazar cualquier capa sin afectar a
las demás.

**Módulos implementados:** Registro de Placas y Registro de Conductores,
cada uno con CRUD completo (crear, listar, editar, eliminar) y su formulario
en una ventana modal.

---

## Tarea 2 — 2 funciones stateful y 2 funciones stateless

Cumplimos el requisito porque desarrollamos e integramos estas 4 funciones
dentro de la lógica de negocio del backend:

### Stateless (`backend/services/validacionesService.js`)

1. **`validarFormatoPlaca(placa)`** — valida que la placa tenga el formato
   `ABC-123` mediante una expresión regular. Mismo input, mismo resultado
   siempre.
2. **`validarDNI(dni)`** — valida que el DNI tenga 8 dígitos. Mismo input,
   mismo resultado siempre.

Ambas se usan en `placaService.js` y `conductorService.js` respectivamente,
antes de crear o actualizar un registro.

### Stateful (`backend/services/statefulService.js`)

1. **`registrarIntentoCreacion(clave)`** — lleva la cuenta, en un `Map` en
   memoria, de cuántos registros ha creado una misma sesión en cada módulo.
   Bloquea al superar 5 intentos. El resultado de cada llamada depende de
   las llamadas anteriores.
2. **`obtenerConCache(clave, fetchFn)`** — cachea en memoria el resultado de
   un listado por 60 segundos. La primera llamada consulta la base de
   datos; las siguientes, dentro de ese tiempo, devuelven el valor
   cacheado sin consultar PostgreSQL.

Ambas se usan en `placaService.js` y `conductorService.js`, en las
operaciones de creación y listado.



## Como correrlo

1. Base de datos:
   ```
   createdb katwil
   ```
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
4. Abrir http://localhost:5173

## Nota sobre cambios de esquema

Si vuelves a modificar los campos de `Placa` o `Conductor`, `sequelize.sync()`
no altera tablas existentes — hay que recrear la base de datos:
```
dropdb katwil && createdb katwil
```

## Pendiente / fuera de alcance

- Módulos de Documentos y Novedades: se descartaron por ahora para mantener
  la app "sencilla" según lo pedido; el dominio queda abierto a agregarlos después.
- Autenticación de usuarios.
