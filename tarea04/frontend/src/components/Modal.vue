<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box">
      <div class="modal-head">
        <h3>{{ title }}</h3>
        <button class="btn-ghost modal-close" @click="$emit('close')" aria-label="Cerrar">✕</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
});
defineEmits(['close']);
</script>

<style>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(31, 42, 55, 0.45);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 1rem;
  z-index: 50;
}

.modal-box {
  background: var(--surface);
  border-top: 3px solid var(--accent);
  width: 100%;
  max-width: 560px;
  padding: 1.4rem 1.6rem;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-head h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  color: var(--accent);
  margin: 0;
}

.modal-close { padding: 0.25rem 0.55rem; }

.modal-body form { flex-direction: column; align-items: stretch; }
.modal-body form > * { width: 100%; }
</style>
