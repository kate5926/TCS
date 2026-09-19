<template>
  <section class="panel">
    <div class="panel-head">
      <h2>{{ t('questionnaire.title') }}</h2>
      <div class="lang-switch">
        <button
          class="btn-ghost"
          :class="{ 'is-active': locale === 'es' }"
          @click="cambiarIdioma('es')"
        >ES</button>
        <button
          class="btn-ghost"
          :class="{ 'is-active': locale === 'en' }"
          @click="cambiarIdioma('en')"
        >EN</button>
      </div>
    </div>

    <p class="subtitle">{{ t('questionnaire.subtitle') }}</p>

    <form v-if="!enviado" @submit.prevent="enviar">
      <label class="campo">
        {{ t('questionnaire.question1') }}
        <input v-model="respuestas.nombre" required />
      </label>
      <label class="campo">
        {{ t('questionnaire.question2') }}
        <input v-model="respuestas.ciudad" required />
      </label>
      <label class="campo">
        {{ t('questionnaire.question3') }}
        <input v-model="respuestas.placaFavorita" required />
      </label>
      <button type="submit">{{ t('questionnaire.submit') }}</button>
    </form>

    <p v-else class="gracias">
      {{ t('questionnaire.thanks', { name: respuestas.nombre }) }}
    </p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const respuestas = reactive({ nombre: '', ciudad: '', placaFavorita: '' });
const enviado = ref(false);

function enviar() {
  enviado.value = true;
}

function cambiarIdioma(nuevoIdioma) {
  locale.value = nuevoIdioma;

  // Refleja el idioma en la URL como parámetro, ej: ?lang=en
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nuevoIdioma);
  window.history.replaceState({}, '', url);
}
</script>

<style scoped>
.lang-switch { display: flex; gap: 0.4rem; }
.lang-switch button.is-active { background: var(--accent-soft); color: var(--ink); border-color: var(--accent); }
.subtitle { color: var(--ink-soft); margin: 0 0 1rem; }
.campo { display: flex; flex-direction: column; gap: 0.3rem; font-weight: 600; flex: 1 1 100%; }
.gracias { font-weight: 600; color: var(--accent); }
</style>
