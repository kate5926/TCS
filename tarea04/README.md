# Tarea 04 — Internacionalización (i18n) y Validación con Expresiones Regulares

Esta práctica continúa el proyecto **Katwil (Registro de Placas y Conductores)** de la tarea-03.
Se le agregaron dos cosas:

1. Un **menú desplegable** para elegir el idioma de la aplicación (Español, English, Português).
2. **Validación de formularios con Expresiones Regulares (regex)**, con mensajes de error en el idioma elegido.

---

## Tecnologías usadas

| Parte    | Herramientas                                   |
|----------|------------------------------------------------|
| Frontend | Vue 3, Vite, vue-router, **vue-i18n**          |
| Backend  | Node.js, Express, Sequelize                    |
| Base de datos | PostgreSQL                                |

---

## ¿Cómo se desarrolló la práctica?

### Paso 1 — Copia del proyecto anterior
Se copió la tarea-03 en la carpeta `tarea04/` para no modificar la entrega anterior.
También se quitaron los archivos que no se usaban (una vista de cuestionario y unas traducciones repetidas).

### Paso 2 — Archivos de traducción
Cada idioma tiene un archivo JSON con los mismos textos, pero traducidos:

```
frontend/src/i18n/
├── es.json   → Español
├── en.json   → English
├── pt.json   → Português (nuevo)
└── index.js  → configuración de vue-i18n
```

Ejemplo (el mismo texto en los tres archivos):

```json
"validacion": { "dni": "El DNI debe tener exactamente 8 dígitos" }      // es
"validacion": { "dni": "The ID number must have exactly 8 digits" }     // en
"validacion": { "dni": "O documento deve ter exatamente 8 dígitos" }    // pt
```

En las vistas ya no se escribe el texto directamente, sino la **clave**: `{{ t('validacion.dni') }}`.

### Paso 3 — Menú desplegable de idioma
En la barra superior (`frontend/src/App.vue`) los botones ES/EN se reemplazaron por un `<select>`:

```html
<select :value="locale" @change="cambiarIdioma($event.target.value)">
  <option v-for="idioma in IDIOMAS" :value="idioma.codigo">
    {{ idioma.bandera }} {{ idioma.nombre }}
  </option>
</select>
```

Al elegir un idioma:
- Toda la interfaz cambia al instante, sin recargar la página.
- Se guarda en `localStorage`, así la app recuerda el idioma la próxima vez.
- Se actualiza la URL con `?lang=es`, `?lang=en` o `?lang=pt` (se puede compartir el link con el idioma).

### Paso 4 — Validación con Expresiones Regulares
Las regex están en un solo archivo, `frontend/src/utils/validaciones.js`, y se usan en los formularios de **Conductores** y **Placas**:

| Campo     | Expresión regular                                   | Qué significa                               | ✅ Válido     | ❌ Inválido   |
|-----------|-----------------------------------------------------|---------------------------------------------|--------------|--------------|
| Nombre    | `^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+( [A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+)*$` | Solo letras, con un espacio entre palabras | `Juan Pérez` | `Juan123`    |
| DNI       | `^\d{8}$`                                           | Exactamente 8 dígitos                       | `12345678`   | `1234`       |
| Licencia  | `^[A-Z]\d{8}$`                                      | 1 letra seguida de 8 dígitos                | `Q12345678`  | `12345678`   |
| Placa     | `^[A-Z]{3}-?\d{3}$`                                 | 3 letras, guion opcional y 3 dígitos        | `ABC-123`    | `AB-12`      |

Cómo leer los símbolos:
- `^` y `$` → inicio y fin del texto (todo el valor debe cumplir el patrón).
- `\d` → un dígito (0-9). `{8}` → repetir exactamente 8 veces.
- `[A-Z]` → una letra. `-?` → el guion puede estar o no.
- `+` → una o más veces. `*` → cero o más veces.

Funcionamiento en el formulario:
- La validación se hace **mientras el usuario escribe**.
- Si el dato no cumple la regex, el campo se pone **rojo** y aparece el mensaje de error debajo.
- Si el dato es correcto, el campo se pone **verde**.
- El botón **Guardar se desactiva** mientras haya errores.
- El mensaje de error sale **en el idioma seleccionado** (aquí se juntan la i18n y las regex).

### Paso 5 — Validación también en el backend
Las mismas regex se repiten en `backend/services/validacionesService.js`.
Así, aunque alguien envíe datos sin usar el formulario (por ejemplo, desde Postman), el servidor también los rechaza.

---

## Archivos modificados / creados

| Archivo | Cambio |
|---------|--------|
| `frontend/src/App.vue` | Menú desplegable de idioma y estilos de los campos válidos e inválidos |
| `frontend/src/i18n/index.js` | Tres idiomas, detección por URL y `localStorage` |
| `frontend/src/i18n/pt.json` | **Nuevo** — traducción al portugués |
| `frontend/src/i18n/es.json`, `en.json` | Mensajes de validación |
| `frontend/src/utils/validaciones.js` | **Nuevo** — expresiones regulares |
| `frontend/src/views/ConductoresView.vue` | Validación en vivo de nombre, DNI y licencia |
| `frontend/src/views/PlacasView.vue` | Validación en vivo de placa y categoría |
| `backend/services/validacionesService.js` | Regex de nombre y licencia |
| `backend/services/conductorService.js` | Usa las nuevas validaciones |

---

## Cómo ejecutarlo

1. Crear la base de datos:
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
3. Frontend (en otra terminal):
   ```
   cd frontend
   npm install
   npm run dev
   ```
4. Abrir http://localhost:5173 (o http://localhost:5173/?lang=en para entrar en inglés).

---

## Capturas de pantalla

> Guardar las imágenes en la carpeta `docs/img/` con los nombres indicados.

### 1. Menú desplegable de idiomas
![Menú de idiomas](docs/img/1-menu-idiomas.png)

### 2. Aplicación en Español
![Español](docs/img/2-espanol.png)

### 3. Aplicación en Inglés
![English](docs/img/3-ingles.png)

### 4. Aplicación en Portugués
![Português](docs/img/4-portugues.png)

### 5. Formulario con errores de validación (regex)
![Errores de validación](docs/img/5-errores-validacion.png)

### 6. Mensajes de error en otro idioma
![Errores en inglés](docs/img/6-errores-ingles.png)

### 7. Formulario con datos válidos
![Formulario válido](docs/img/7-formulario-valido.png)

### 8. Registro guardado en la tabla
![Registro guardado](docs/img/8-registro-guardado.png)

---

## Conclusión

- Con **vue-i18n** se separan los textos del código, así que agregar un idioma nuevo solo requiere crear un archivo JSON.
- Las **expresiones regulares** permiten validar el formato de los datos con una sola línea, y se reutilizan en el frontend y en el backend.
- Validar en el frontend mejora la experiencia del usuario y validar en el backend protege los datos.
