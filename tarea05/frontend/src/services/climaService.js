import axios from 'axios';

// Servicio EXTERNO: Open-Meteo (https://open-meteo.com).
// Es gratuito, no necesita API key y permite CORS, por eso el navegador
// lo consume directamente sin pasar por nuestro backend.
const openMeteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
});

// Ciudades de las rutas de transporte que se muestran en la vista.
export const CIUDADES = [
  { nombre: 'Lima', lat: -12.0464, lon: -77.0428 },
  { nombre: 'Arequipa', lat: -16.409, lon: -71.5375 },
  { nombre: 'Cusco', lat: -13.5319, lon: -71.9675 },
  { nombre: 'Trujillo', lat: -8.1116, lon: -79.0288 },
  { nombre: 'Piura', lat: -5.1945, lon: -80.6328 },
  { nombre: 'Puno', lat: -15.8402, lon: -70.0219 },
];

// Una sola peticion trae el clima actual de todas las ciudades:
// Open-Meteo acepta varias coordenadas separadas por coma.
export async function obtenerClimaActual(ciudades = CIUDADES) {
  const { data } = await openMeteo.get('/forecast', {
    params: {
      latitude: ciudades.map((c) => c.lat).join(','),
      longitude: ciudades.map((c) => c.lon).join(','),
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
      timezone: 'America/Lima',
    },
  });

  // Con una sola ciudad la API devuelve un objeto; con varias, un arreglo.
  const resultados = Array.isArray(data) ? data : [data];

  return resultados.map((r, i) => ({
    ciudad: ciudades[i].nombre,
    temperatura: r.current.temperature_2m,
    humedad: r.current.relative_humidity_2m,
    viento: r.current.wind_speed_10m,
    codigo: r.current.weather_code,
    hora: r.current.time,
  }));
}

// Convierte el codigo WMO de Open-Meteo en una clave i18n del estado del clima.
export function describirCodigo(codigo) {
  if (codigo === 0) return 'clima.estado.despejado';
  if (codigo <= 3) return 'clima.estado.nublado';
  if (codigo <= 48) return 'clima.estado.niebla';
  if (codigo <= 67) return 'clima.estado.lluvia';
  if (codigo <= 77) return 'clima.estado.nieve';
  if (codigo <= 82) return 'clima.estado.chubascos';
  if (codigo <= 86) return 'clima.estado.nieve';
  return 'clima.estado.tormenta';
}
