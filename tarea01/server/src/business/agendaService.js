const agendaRepository = require('../data/agendaRepository');

class AgendaService {
  async registrarContacto({ nombre, telefono, email }) {
    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre es obligatorio.');
    }

    if (!telefono || telefono.trim().length < 7) {
      throw new Error('El teléfono debe tener al menos 7 dígitos.');
    }

    const existe = await agendaRepository.buscarPorTelefono(telefono.trim());
    if (existe) {
      throw new Error('Ya existe un contacto registrado con este número de teléfono.');
    }

    const contactoData = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      email: email ? email.trim() : ''
    };

    return await agendaRepository.agregar(contactoData);
  }

  async listarContactos() {
    return await agendaRepository.obtenerTodos();
  }
}

module.exports = new AgendaService();