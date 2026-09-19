<template>
  <section class="panel">
    <div class="panel-head">
      <h2>{{ t('nav.conductores') }}</h2>
      <button @click="abrirNuevo">{{ t('conductores.addButton') }}</button>
    </div>

    <table>
      <thead>
        <tr><th>{{ t('conductores.colNombre') }}</th><th>{{ t('conductores.colDni') }}</th><th>{{ t('conductores.colLicencia') }}</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="c in conductores" :key="c.id">
          <td>{{ c.nombre }}</td>
          <td>{{ c.dni }}</td>
          <td>{{ c.numero_licencia }}</td>
          <td class="acciones">
            <button class="btn-ghost" @click="abrirEditar(c)">{{ t('conductores.editButton') }}</button>
            <button class="btn-danger" @click="eliminar(c.id)">{{ t('conductores.deleteButton') }}</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :open="mostrarModal" :title="editandoId ? t('conductores.modalEdit') : t('conductores.modalNew')" @close="cerrarModal">
      <form @submit.prevent="guardar">
        <input v-model="form.nombre" :placeholder="t('conductores.placeholderNombre')" required />
        <input v-model="form.dni" :placeholder="t('conductores.placeholderDni')" required />
        <input v-model="form.numero_licencia" :placeholder="t('conductores.placeholderLicencia')" required />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">{{ editandoId ? t('conductores.saveEdit') : t('conductores.saveNew') }}</button>
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

const conductores = ref([]);
const mostrarModal = ref(false);
const editandoId = ref(null);
const error = ref('');
const form = ref(vacio());

function vacio() {
  return { nombre: '', dni: '', numero_licencia: '' };
}

async function cargar() {
  const { data } = await api.listarConductores();
  conductores.value = data;
}

function abrirNuevo() {
  editandoId.value = null;
  form.value = vacio();
  error.value = '';
  mostrarModal.value = true;
}

function abrirEditar(c) {
  editandoId.value = c.id;
  form.value = { nombre: c.nombre, dni: c.dni, numero_licencia: c.numero_licencia };
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
      await api.actualizarConductor(editandoId.value, form.value);
    } else {
      await api.crearConductor(form.value);
    }
    cerrarModal();
    await cargar();
  } catch (e) {
    error.value = e.response?.data?.error || t('conductores.errorGeneric');
  }
}

async function eliminar(id) {
  if (!confirm(t('conductores.confirmDelete'))) return;
  await api.eliminarConductor(id);
  await cargar();
}

onMounted(cargar);
</script>
