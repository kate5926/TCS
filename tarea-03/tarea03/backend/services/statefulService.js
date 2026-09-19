/**
 * Este archivo concentra las 2 funciones STATEFUL pedidas en la tarea 2.
 * Ambas guardan estado en memoria del proceso Node (no en PostgreSQL),
 * por eso el resultado de una llamada depende de las llamadas anteriores
 * dentro de la misma ejecucion del servidor.
 */

// Map<clave, intentos>. clave = `${modulo}:${sesionId}` para llevar cupos
// separados por modulo (placas y conductores no comparten limite).
const intentosPorClave = new Map();
const LIMITE_INTENTOS = 5;

/**
 * STATEFUL #1
 * registrarIntentoCreacion
 * Limita cuantos registros puede crear una misma sesion en un modulo.
 * El resultado de la llamada N+1 depende de las N llamadas previas.
 */
function registrarIntentoCreacion(clave) {
  const previos = intentosPorClave.get(clave) || 0;
  const actuales = previos + 1;
  intentosPorClave.set(clave, actuales);

  return {
    permitido: actuales <= LIMITE_INTENTOS,
    intentosRealizados: actuales,
    intentosRestantes: Math.max(LIMITE_INTENTOS - actuales, 0),
  };
}

// Cache simple en memoria: clave -> { data, timestamp }
const cacheConsultas = new Map();
const TTL_CACHE_MS = 60 * 1000; // 1 minuto

/**
 * STATEFUL #2
 * obtenerConCache
 * La primera llamada con una clave dada ejecuta fetchFn (va a la DB).
 * Llamadas posteriores con la misma clave, dentro del TTL, devuelven el
 * valor cacheado sin tocar la DB.
 */
async function obtenerConCache(clave, fetchFn) {
  const entrada = cacheConsultas.get(clave);
  const ahora = Date.now();

  if (entrada && (ahora - entrada.timestamp) < TTL_CACHE_MS) {
    return { data: entrada.data, origen: 'cache' };
  }

  const data = await fetchFn();
  cacheConsultas.set(clave, { data, timestamp: ahora });
  return { data, origen: 'db' };
}

function limpiarCache() {
  cacheConsultas.clear();
}

module.exports = { registrarIntentoCreacion, obtenerConCache, limpiarCache };
