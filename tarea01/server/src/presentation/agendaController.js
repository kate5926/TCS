const agendaService = require('../business/agendaService');

class AgendaController {
  async crearContacto(req, res) {
    try {
      const { nombre, telefono, email } = req.body;
      const nuevoContacto = await agendaService.registrarContacto({ nombre, telefono, email });
      res.status(201).json(nuevoContacto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerContactos(req, res) {
    try {
      const contactos = await agendaService.listarContactos();
      res.status(200).json(contactos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de contactos.' });
    }
  }
}

module.exports = new AgendaController();