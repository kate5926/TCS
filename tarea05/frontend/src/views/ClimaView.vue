<template>
  <section class="panel">
    <div class="panel-head">
      <h2>{{ t('nav.clima') }}</h2>
      <button class="btn-ghost" :disabled="cargando" @click="cargar">
        {{ cargando ? t('clima.cargando') : t('clima.actualizar') }}
      </button>
    </div>

    <p class="fuente">{{ t('clima.descripcion') }}</p>

    <p v-if="error" class="error">{{ t('clima.error') }}</p>

    <div v-else class="clima-grid">
      <article v-for="c in clima" :key="c.ciudad" class="clima-card">
        <h3>{{ c.ciudad }}</h3>
        <p class="clima-temp">{{ Math.round(c.temperatura) }} °C</p>
        <p class="clima-estado">{{ t(describirCodigo(c.codigo)) }}</p>
        <dl>
          <dt>{{ t('clima.humedad') }}</dt><dd>{{ c.humedad }} %</dd>
          <dt>{{ t('clima.viento') }}</dt><dd>{{ c.viento }} km/h</dd>
        </dl>
      </article>
    </div>

    <p v-if="actualizado" class="fuente">
      {{ t('clima.actualizado', { hora: actualizado }) }} ·
      <a href="https://open-meteo.com" target="_blank" rel="noopener">Open-Meteo</a>
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerClimaActual, describirCodigo } from '../services/climaService';

const { t } = useI18n();

const clima = ref([]);
const cargando = ref(false);
const error = ref(false);
const actualizado = ref('');

async function cargar() {
  cargando.value = true;
  error.value = false;
  try {
    clima.value = await obtenerClimaActual();
    actualizado.value = clima.value[0]?.hora.replace('T', ' ') || '';
  } catch {
    error.value = true;
  } finally {
    cargando.value = false;
  }
}

onMounted(cargar);
</script>

<style scoped>
.fuente { color: var(--ink-soft); font-size: 0.85rem; margin: 0 0 1rem; }
.fuente a { color: var(--accent); }

.clima-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.clima-card {
  border: 1px solid var(--line);
  padding: 1rem;
  background: var(--accent-soft);
}

.clima-card h3 { font-size: 1rem; }
.clima-temp { font-size: 1.8rem; font-weight: 700; margin: 0.4rem 0 0; }
.clima-estado { color: var(--ink-soft); margin: 0 0 0.6rem; }

dl { display: grid; grid-template-columns: auto 1fr; gap: 0.15rem 0.6rem; margin: 0; font-size: 0.85rem; }
dt { color: var(--ink-soft); }
dd { margin: 0; text-align: right; }
</style>
