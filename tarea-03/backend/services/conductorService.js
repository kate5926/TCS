const repo = require('../repositories/conductorRepository');
const { obtenerConCache, limpiarCache, registrarIntentoCreacion } = require('./statefulService');
const { validarDNI } = require('./validacionesService');

function validar({ nombre, dni, numero_licencia }) {
  if (!nombre || !dni || !numero_licencia) {
    const err = new Error('nombre, dni y numero_licencia son obligatorios');
    err.status = 400;
    throw err;
  }
  if (!validarDNI(dni)) {
    const err = new Error('DNI invalido (debe tener 8 digitos)');
    err.status = 400;
    throw err;
  }
}

async function crear(data, sesionId) {
  validar(data);

  if (sesionId) {
    const resultado = registrarIntentoCreacion(`conductores:${sesionId}`);
    if (!resultado.permitido) {
      const err = new Error('Limite de intentos de registro alcanzado para esta sesion');
      err.status = 429;
      throw err;
    }
  }

  const conductor = await repo.crear(data);
  limpiarCache();
  return conductor;
}

async function listar() {
  return obtenerConCache('conductores:all', repo.listar);
}

async function actualizar(id, data) {
  validar(data);
  const existente = await repo.buscarPorId(id);
  if (!existente) {
    const err = new Error(`Conductor ${id} no existe`);
    err.status = 404;
    throw err;
  }
  await repo.actualizar(id, data);
  limpiarCache();
  return repo.buscarPorId(id);
}

async function eliminar(id) {
  const filas = await repo.eliminar(id);
  if (!filas) {
    const err = new Error(`Conductor ${id} no existe`);
    err.status = 404;
    throw err;
  }
  limpiarCache();
}

module.exports = { crear, listar, actualizar, eliminar };
