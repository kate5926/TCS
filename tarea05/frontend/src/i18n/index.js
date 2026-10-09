import { createI18n } from 'vue-i18n';
import es from './es.json';
import en from './en.json';
import pt from './pt.json';

// Idiomas que aparecen en el menu desplegable.
const IDIOMAS = [
  { codigo: 'es', nombre: 'Español' },
  { codigo: 'en', nombre: 'English' },
  { codigo: 'pt', nombre: 'Português' },
];
const IDIOMAS_SOPORTADOS = IDIOMAS.map((i) => i.codigo);

function leerIdiomaGuardado() {
  try {
    return localStorage.getItem('lang');
  } catch {
    return null;
  }
}

// Prioridad: parametro de URL (?lang=en) > ultimo idioma elegido > 'es'.
function detectarIdiomaInicial() {
  const params = new URLSearchParams(window.location.search);
  const candidatos = [params.get('lang'), leerIdiomaGuardado()];
  return candidatos.find((lang) => IDIOMAS_SOPORTADOS.includes(lang)) || 'es';
}

function guardarIdioma(lang) {
  try {
    localStorage.setItem('lang', lang);
  } catch {
    // Sin almacenamiento disponible: el idioma solo vive en la URL.
  }
  document.documentElement.lang = lang;
}

const i18n = createI18n({
  legacy: false, // necesario para usar useI18n() con <script setup>
  locale: detectarIdiomaInicial(),
  fallbackLocale: 'es',
  messages: { es, en, pt },
});

document.documentElement.lang = i18n.global.locale.value;

export default i18n;
export { IDIOMAS, IDIOMAS_SOPORTADOS, guardarIdioma };
