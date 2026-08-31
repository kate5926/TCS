const db = require('./db');

class AgendaRepository {
  async agregar(contacto) {
    const contactos = await db.leer();
    const nextId = contactos.length > 0 ? Math.max(...contactos.map(c => c.id)) + 1 : 1;
    const nuevoContacto = { id: nextId, ...contacto };
    
    contactos.push(nuevoContacto);
    await db.guardar(contactos);
    return nuevoContacto;
  }

  async obtenerTodos() {
    return await db.leer();
  }

  async buscarPorTelefono(telefono) {
    const contactos = await db.leer();
    return contactos.find(c => c.telefono === telefono);
  }
}

module.exports = new AgendaRepository();