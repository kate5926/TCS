# Agenda de Contactos - Arquitectura Web de N-Capas

Esta aplicación web de gestión de contactos está desarrollada con Node.js en el backend y JavaScript en el frontend. Su diseño sigue rigurosamente el patrón de **Arquitectura Web en N-Capas**  para garantizar un código desacoplado, mantenible, fácil de probar y escalable.

---

## ¿Por qué es una Arquitectura Web de N-Capas?

La **Arquitectura en N-Capas** es un patrón de diseño software en el que los componentes del sistema se organizan en capas horizontales independientes, donde cada capa tiene una **responsabilidad única y delimitada** (Principio de Responsabilidad Única). 

En esta aplicación, la separación garantiza que:
1. **Desacoplamiento:** Ninguna capa depende de la implementación interna de otra. Si se cambia la interfaz gráfica o la base de datos, el resto del código no se ve afectado.
2. **Independencia de la Lógica:** Las reglas de validación (como evitar teléfonos duplicados) no residen en la interfaz ni en la base de datos, sino estrictamente en la Capa de Negocio.
3. **Escalabilidad y Mantenibilidad:** Permite reemplazar componentes (por ejemplo, cambiar la persistencia de archivos JSON a PostgreSQL) modificando únicamente la Capa de Datos sin alterar la lógica de negocio ni la interfaz.

---

## Estructura del Proyecto y Descripción de Carpetas

A continuación se detalla la función específica de cada carpeta y archivo dentro de la estructura:

```text
tarea01/
├── client/                     # CAPA DE PRESENTACIÓN (FRONTEND)
│   ├── index.html              # Estructura de la interfaz de usuario (UI)
│   └── src/
│       └── main.js             # Lógica de interacción en el navegador y consumo de API
│
└── server/                     # CAPA DE SERVIDOR Y BACKEND
    ├── package.json            # Configuración de dependencias del servidor Node.js
    └── src/
        ├── app.js              # Punto de entrada y servidor Express
        │
        ├── presentation/       # CAPA DE PRESENTACIÓN (BACKEND)
        │   └── agendaController.js # Rutas de la API REST (Endpoints HTTP)
        │
        ├── business/           # CAPA DE NEGOCIO
        │   └── agendaService.js # Reglas del dominio y validaciones
        │
        └── data/               # CAPA DE DATOS Y PERSISTENCIA
            ├── agendaRepository.js
            ├── db.js               
            └── contactos.json    

### Detalle de Responsabilidades por Carpeta

* **`client/` (Presentación Frontend):**
  * **`index.html`:** Contiene el formulario de captura y la estructura visual donde se listan los contactos.
  * **`src/main.js`:** Captura los eventos del usuario (clicks, envíos de formulario) y realiza las peticiones `fetch` HTTP (`GET`, `POST`, `PUT`, `DELETE`) al servidor.

* **`server/src/presentation/` (Presentación Backend / Controlador):**
  * **`agendaController.js`:** Recibe las solicitudes HTTP entrantes, extrae los parámetros o cuerpo del mensaje, delega la operación a la capa de negocio y responde con el estado HTTP adecuado (`200 OK`, `201 Created`, `400 Bad Request`).

* **`server/src/business/` (Lógica de Negocio):**
  * **`agendaService.js`:** Mantiene las reglas operativas de la aplicación. Valida que los campos obligatorios estén presentes y verifica que no existan teléfonos duplicados antes de autorizar la creación o actualización de un contacto.

* **`server/src/data/` (Acceso a Datos y Persistencia):**
  * **`agendaRepository.js`:** Implementa el patrón Repository. Ofrece una interfaz de métodos (`agregar`, `obtenerTodos`, `buscarPorId`, `actualizar`, `eliminar`) abstracta para que la capa de negocio opere sobre los datos sin conocer el formato en que están almacenados.
  * **`db.js`:** Contiene la lógica de bajo nivel para leer y escribir el archivo del sistema utilizando el módulo `fs/promises` de Node.js.
  * **`contactos.json`:** Archivo plano que actúa como la base de datos persistente del sistema.

---

## Guía de Ejecución

```powershell
cd server
npm install
node src/app.js
http://localhost:3000/
