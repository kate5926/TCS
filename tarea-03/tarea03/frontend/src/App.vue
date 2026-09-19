<template>
  <div class="shell">
    <Sidebar />
    <div class="content">
      <header class="crumbbar">
        <span class="crumb">Inicio</span>
        <span class="crumb-sep">›</span>
        <span class="crumb crumb-current">{{ tituloActual }}</span>
      </header>
      <main class="page">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
const tituloActual = computed(() => route.meta.titulo || '');
</script>

<style>
:root {
  --bg: #F4F8FC;
  --surface: #FFFFFF;
  --ink: #0B3D66;
  --ink-soft: #5C7A99;
  --line: #D7E4EF;
  --accent: #1D6FA5;
  --accent-dark: #124F76;
  --accent-soft: #EAF3FA;
  --danger: #B23A34;
  --radius: 3px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 15px;
  line-height: 1.5;
}

h1, h2, h3 {
  font-family: 'Oswald', -apple-system, sans-serif;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin: 0;
}

.shell { display: flex; min-height: 100vh; }
.content { flex: 1; min-width: 0; }

.crumbbar {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  padding: 0.9rem 1.75rem;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.crumb-sep { margin: 0 0.4rem; }
.crumb-current { color: var(--ink); font-weight: 600; }

.page { max-width: 1000px; margin: 0 auto; padding: 1.75rem; }

.panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 3px solid var(--accent);
  padding: 1.25rem 1.4rem;
  margin-bottom: 1.5rem;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--line);
}

.panel h2 { font-size: 1.1rem; color: var(--accent); }

form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

input, select, textarea {
  font: inherit;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
}

input:focus, select:focus, button:focus, textarea:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

button {
  font: inherit;
  font-weight: 600;
  padding: 0.55rem 1rem;
  border: none;
  border-radius: var(--radius);
  background: var(--accent);
  color: #fff;
  cursor: pointer;
}

button:hover { background: var(--accent-dark); }

button.btn-ghost { background: transparent; color: var(--ink-soft); border: 1px solid var(--line); }
button.btn-ghost:hover { background: var(--accent-soft); color: var(--ink); }

button.btn-danger { background: transparent; color: var(--danger); border: 1px solid var(--danger); }
button.btn-danger:hover { background: var(--danger); color: #fff; }

table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }

th {
  text-align: left;
  padding: 0.5rem 0.6rem;
  color: var(--ink-soft);
  font-weight: 600;
  border-bottom: 2px solid var(--line);
}

td {
  padding: 0.55rem 0.6rem;
  border-bottom: 1px solid var(--line);
}

.acciones { display: flex; gap: 0.4rem; }
.acciones button { padding: 0.35rem 0.65rem; font-size: 0.85rem; }

.error { color: var(--danger); font-size: 0.9rem; margin: 0 0 0.75rem; }

/* Grid de tarjetas de inicio, estilo panel de accesos directos */
.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; }

.tile {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--ink);
  transition: border-color .15s, background .15s;
}

.tile:hover { border-color: var(--accent); background: var(--accent-soft); }
.tile-icon { font-size: 2rem; }
.tile-label { font-weight: 600; font-size: 0.9rem; text-align: center; }
</style>
