// Expresiones regulares usadas para validar los formularios.
// Cada regla devuelve una clave de traduccion (i18n) cuando el valor no
// cumple el patron, o '' cuando es valido. Asi el mensaje de error sale
// en el idioma seleccionado.

export const PATRONES = {
  // Solo letras (incluye tildes y ñ) separadas por un espacio simple.
  nombre: /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+( [A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+)*$/,
  // DNI peruano: exactamente 8 digitos.
  dni: /^\d{8}$/,
  // Licencia de conducir peruana: 1 letra + 8 digitos (ej. Q12345678).
  licencia: /^[A-Z]\d{8}$/i,
  // Placa: 3 letras + guion opcional + 3 digitos (ej. ABC-123).
  placa: /^[A-Z]{3}-?\d{3}$/i,
};

export function validarCampo(campo, valor) {
  const texto = (valor || '').trim();
  if (!texto) return 'validacion.requerido';
  if (!PATRONES[campo].test(texto)) return `validacion.${campo}`;
  return '';
}

// Valida todos los campos indicados y devuelve { campo: claveError }.
export function validarFormulario(form, campos) {
  const errores = {};
  for (const [campo, regla] of Object.entries(campos)) {
    errores[campo] = validarCampo(regla, form[campo]);
  }
  return errores;
}

export function hayErrores(errores) {
  return Object.values(errores).some(Boolean);
}
