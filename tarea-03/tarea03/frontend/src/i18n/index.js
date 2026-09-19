import { createI18n } from 'vue-i18n';
import es from './locales/es.json';
import en from './locales/en.json';

// El idioma depende del parámetro enviado al ejecutar la app,
// por ejemplo: http://localhost:5173/?lang=en
function idiomaInicial() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  return ['es', 'en'].includes(lang) ? lang : 'es';
}

const i18n = createI18n({
  legacy: false, // habilita la Composition API (useI18n)
  locale: idiomaInicial(),
  fallbackLocale: 'es',
  messages: { es, en },
});

export default i18n;
