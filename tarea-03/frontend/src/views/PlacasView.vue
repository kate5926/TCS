<template>
  <section class="panel">
    <div class="panel-head">
      <h2>{{ t('nav.placas') }}</h2>
      <button @click="abrirNuevo">{{ t('placas.addButton') }}</button>
    </div>

    <table>
      <thead>
        <tr><th>{{ t('placas.colPlaca') }}</th><th>{{ t('placas.colCategoria') }}</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="p in placas" :key="p.id">
          <td>{{ p.placa }}</td>
          <td>{{ p.categoria }}</td>
          <td class="acciones">
            <button class="btn-ghost" @click="abrirEditar(p)">{{ t('placas.editButton') }}</button>
            <button class="btn-danger" @click="eliminar(p.id)">{{ t('placas.deleteButton') }}</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :open="mostrarModal" :title="editandoId ? t('placas.modalEdit') : t('placas.modalNew')" @close="cerrarModal">
      <form @submit.prevent="guardar">
        <input v-model="form.placa" :placeholder="t('placas.placeholderPlaca')" required />
        <select v-model="form.categoria" required>
          <option disabled value="">{{ t('placas.categoriaLabel') }}</option>
          <option value="tracto">{{ t('placas.categoriaTracto') }}</option>
          <option value="carreta">{{ t('placas.categoriaCarreta') }}</option>
        </select>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">{{ editandoId ? t('placas.saveEdit') : t('placas.saveNew') }}</button>
      </form>
    </Modal>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import api from '../services/api';
import Modal from '../components/Modal.vue';

const { t } = useI18n();

const placas = ref([]);
const mostrarModal = ref(false);
const editandoId = ref(null);
const error = ref('');
const form = ref(vacio());

function vacio() {
  return { placa: '', categoria: '' };
}

async function cargar() {
  const { data } = await api.listarPlacas();
  placas.value = data;
}

function abrirNuevo() {
  editandoId.value = null;
  form.value = vacio();
  error.value = '';
  mostrarModal.value = true;
}

function abrirEditar(p) {
  editandoId.value = p.id;
  form.value = { placa: p.placa, categoria: p.categoria };
  error.value = '';
  mostrarModal.value = true;
}

function cerrarModal() {
  mostrarModal.value = false;
}

async function guardar() {
  error.value = '';
  try {
    if (editandoId.value) {
      await api.actualizarPlaca(editandoId.value, form.value);
    } else {
      await api.crearPlaca(form.value);
    }
    cerrarModal();
    await cargar();
  } catch (e) {
    error.value = e.response?.data?.error || t('placas.errorGeneric');
  }
}

async function eliminar(id) {
  if (!confirm(t('placas.confirmDelete'))) return;
  await api.eliminarPlaca(id);
  await cargar();
}

onMounted(cargar);
</script>
