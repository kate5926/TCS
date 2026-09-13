const repo = require('../repositories/placaRepository');
const { obtenerConCache, limpiarCache, registrarIntentoCreacion } = require('./statefulService');
const { validarFormatoPlaca } = require('./validacionesService');

function validar({ placa, categoria }) {
  if (!placa || !categoria) {
    const err = new Error('placa y categoria son obligatorios');
    err.status = 400;
    throw err;
  }
  if (!validarFormatoPlaca(placa)) {
    const err = new Error('Formato de placa invalido (esperado: ABC-123)');
    err.status = 400;
    throw err;
  }
  if (!['tracto', 'carreta'].includes(categoria)) {
    const err = new Error("categoria debe ser 'tracto' o 'carreta'");
    err.status = 400;
    throw err;
  }
}

async function crear(data, sesionId) {
  validar(data);

  if (sesionId) {
    const resultado = registrarIntentoCreacion(`placas:${sesionId}`);
    if (!resultado.permitido) {
      const err = new Error('Limite de intentos de registro alcanzado para esta sesion');
      err.status = 429;
      throw err;
    }
  }

  const placa = await repo.crear(data);
  limpiarCache();
  return placa;
}

async function listar() {
  return obtenerConCache('placas:all', repo.listar);
}

async function actualizar(id, data) {
  validar(data);
  const existente = await repo.buscarPorId(id);
  if (!existente) {
    const err = new Error(`Placa ${id} no existe`);
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
    const err = new Error(`Placa ${id} no existe`);
    err.status = 404;
    throw err;
  }
  limpiarCache();
}

module.exports = { crear, listar, actualizar, eliminar };
