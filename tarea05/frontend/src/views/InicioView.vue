<template>
  <section>
    <div class="tiles">
      <router-link to="/placas" class="tile">
        <span class="tile-label">{{ t('home.placasTile') }}</span>
      </router-link>
      <router-link to="/conductores" class="tile">
        <span class="tile-label">{{ t('home.conductoresTile') }}</span>
      </router-link>
      <router-link to="/clima" class="tile">
        <span class="tile-label">{{ t('home.climaTile') }}</span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
