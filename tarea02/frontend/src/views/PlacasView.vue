<template>
  <section class="panel">
    <div class="panel-head">
      <h2>Registro de Placas</h2>
      <button @click="abrirNuevo">+ Agregar placa</button>
    </div>

    <table>
      <thead>
        <tr><th>Placa</th><th>Categoría</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="p in placas" :key="p.id">
          <td>{{ p.placa }}</td>
          <td>{{ p.categoria }}</td>
          <td class="acciones">
            <button class="btn-ghost" @click="abrirEditar(p)">Editar</button>
            <button class="btn-danger" @click="eliminar(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :open="mostrarModal" :title="editandoId ? 'Editar placa' : 'Nueva placa'" @close="cerrarModal">
      <form @submit.prevent="guardar">
        <input v-model="form.placa" placeholder="Placa (ej. ABC-123)" required />
        <select v-model="form.categoria" required>
          <option disabled value="">Categoría</option>
          <option value="tracto">Tracto</option>
          <option value="carreta">Carreta</option>
        </select>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">{{ editandoId ? 'Guardar cambios' : 'Agregar placa' }}</button>
      </form>
    </Modal>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import Modal from '../components/Modal.vue';

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
    error.value = e.response?.data?.error || 'Error al guardar la placa';
  }
}

async function eliminar(id) {
  if (!confirm('¿Eliminar esta placa?')) return;
  await api.eliminarPlaca(id);
  await cargar();
}

onMounted(cargar);
</script>
