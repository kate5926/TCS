import { createI18n } from 'vue-i18n';
import es from './es.json';
import en from './en.json';

const IDIOMAS_SOPORTADOS = ['es', 'en'];

// El idioma inicial depende del parametro de URL (?lang=en), tal como
// pide la tarea: "el lenguaje dependera del parametro que se envie al
// momento de la ejecucion". Si no viene o es invalido, usa 'es' por defecto.
function detectarIdiomaInicial() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  return IDIOMAS_SOPORTADOS.includes(lang) ? lang : 'es';
}

const i18n = createI18n({
  legacy: false, // necesario para usar useI18n() con <script setup>
  locale: detectarIdiomaInicial(),
  fallbackLocale: 'es',
  messages: { es, en },
});

export default i18n;
export { IDIOMAS_SOPORTADOS };
