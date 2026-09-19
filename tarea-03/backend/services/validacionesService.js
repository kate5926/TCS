/**
 * STATELESS #1
 * validarFormatoPlaca
 * Placas de carga pesada en Peru: 3 letras + 3 digitos, guion opcional.
 * Mismo input -> mismo resultado siempre, sin leer nada externo.
 */
function validarFormatoPlaca(placa) {
  const patron = /^[A-Z]{3}-?\d{3}$/i;
  return patron.test((placa || '').trim());
}

/**
 * STATELESS #2
 * validarDNI
 * DNI peruano: exactamente 8 digitos numericos. Funcion pura de validacion.
 */
function validarDNI(dni) {
  const patron = /^\d{8}$/;
  return patron.test((dni || '').trim());
}

module.exports = { validarFormatoPlaca, validarDNI };
