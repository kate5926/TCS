<template>
  <nav class="sidebar">
    <router-link to="/" class="sidebar-mark" title="Inicio">KW</router-link>
    <ul>
      <li v-for="item in items" :key="item.to">
        <router-link :to="item.to" class="sidebar-item" active-class="is-active">
          <span class="sidebar-icon">{{ item.icon }}</span>
          <span class="sidebar-label">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const items = [
  { to: '/', icon: '⌂', label: 'Inicio' },
  { to: '/placas', icon: '🚚', label: 'Placas' },
  { to: '/conductores', icon: '👤', label: 'Conductores' },
  { to: '/cuestionario', icon: '🌐', label: 'Cuestionario' },
];
</script>

<style scoped>
.sidebar {
  background: var(--accent);
  width: 84px;
  min-height: 100vh;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.sidebar-mark {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--accent);
  background: #FFFFFF;
  padding: 0.35rem 0.55rem;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

ul { list-style: none; margin: 0; padding: 0; width: 100%; }

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.7rem 0.25rem;
  color: #D7E7F5;
  text-decoration: none;
  border-left: 3px solid transparent;
  font-size: 0.7rem;
}

.sidebar-icon { font-size: 1.2rem; }

.sidebar-item:hover { color: #fff; background: rgba(255,255,255,0.1); }

.sidebar-item.is-active {
  color: #fff;
  border-left: 3px solid #ffffff;
  background: rgba(255,255,255,0.12);
}

@media (max-width: 800px) {
  .sidebar { width: 100%; min-height: auto; flex-direction: row; justify-content: space-around; padding: 0.5rem 0; }
  .sidebar-mark { display: none; }
  ul { display: flex; width: auto; }
}
</style>
