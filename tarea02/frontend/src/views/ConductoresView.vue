<template>
  <section class="panel">
    <div class="panel-head">
      <h2>Registro de Conductores</h2>
      <button @click="abrirNuevo">+ Agregar conductor</button>
    </div>

    <table>
      <thead>
        <tr><th>Nombre</th><th>DNI</th><th>N° Licencia</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="c in conductores" :key="c.id">
          <td>{{ c.nombre }}</td>
          <td>{{ c.dni }}</td>
          <td>{{ c.numero_licencia }}</td>
          <td class="acciones">
            <button class="btn-ghost" @click="abrirEditar(c)">Editar</button>
            <button class="btn-danger" @click="eliminar(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :open="mostrarModal" :title="editandoId ? 'Editar conductor' : 'Nuevo conductor'" @close="cerrarModal">
      <form @submit.prevent="guardar">
        <input v-model="form.nombre" placeholder="Nombre completo" required />
        <input v-model="form.dni" placeholder="DNI (8 dígitos)" required />
        <input v-model="form.numero_licencia" placeholder="Número de licencia" required />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">{{ editandoId ? 'Guardar cambios' : 'Agregar conductor' }}</button>
      </form>
    </Modal>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import Modal from '../components/Modal.vue';

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
    error.value = e.response?.data?.error || 'Error al guardar el conductor';
  }
}

async function eliminar(id) {
  if (!confirm('¿Eliminar este conductor?')) return;
  await api.eliminarConductor(id);
  await cargar();
}

onMounted(cargar);
</script>
