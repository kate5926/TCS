/**
 * Validaciones con Expresiones Regulares (funciones puras / stateless).
 * Son las mismas reglas que usa el frontend (frontend/src/utils/validaciones.js):
 * el frontend avisa al usuario en vivo y el backend vuelve a validar por
 * seguridad, porque una peticion HTTP puede saltarse el formulario.
 */

// Placas de carga pesada en Peru: 3 letras + 3 digitos, guion opcional.
function validarFormatoPlaca(placa) {
  const patron = /^[A-Z]{3}-?\d{3}$/i;
  return patron.test((placa || '').trim());
}

// DNI peruano: exactamente 8 digitos numericos.
function validarDNI(dni) {
  const patron = /^\d{8}$/;
  return patron.test((dni || '').trim());
}

// Nombre: solo letras (con tildes y ñ) y un espacio entre palabras.
function validarNombre(nombre) {
  const patron = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+( [A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+)*$/;
  return patron.test((nombre || '').trim());
}

// Licencia de conducir: 1 letra + 8 digitos (ej. Q12345678).
function validarLicencia(licencia) {
  const patron = /^[A-Z]\d{8}$/i;
  return patron.test((licencia || '').trim());
}

module.exports = { validarFormatoPlaca, validarDNI, validarNombre, validarLicencia };
