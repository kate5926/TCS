const express = require('express');
const cors = require('cors');
const path = require('path');
const agendaController = require('./presentation/agendaController');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la interfaz gráfica
app.use(express.static(path.join(__dirname, '../../client')));

// Endpoints de la API
app.post('/api/contactos', (req, res) => agendaController.crearContacto(req, res));
app.get('/api/contactos', (req, res) => agendaController.obtenerContactos(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});