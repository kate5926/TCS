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
      <form novalidate @submit.prevent="guardar">
        <div class="campo">
          <input
            v-model="form.placa"
            :placeholder="t('placas.placeholderPlaca')"
            :class="claseCampo('placa')"
            @blur="tocados.placa = true"
          />
          <small v-if="mostrarError('placa')" class="campo-error">{{ t(errores.placa) }}</small>
        </div>
        <div class="campo">
          <select
            v-model="form.categoria"
            :class="claseCampo('categoria')"
            @blur="tocados.categoria = true"
          >
            <option disabled value="">{{ t('placas.categoriaLabel') }}</option>
            <option value="tracto">{{ t('placas.categoriaTracto') }}</option>
            <option value="carreta">{{ t('placas.categoriaCarreta') }}</option>
          </select>
          <small v-if="mostrarError('categoria')" class="campo-error">{{ t(errores.categoria) }}</small>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="hayErrores(errores)">
          {{ editandoId ? t('placas.saveEdit') : t('placas.saveNew') }}
        </button>
      </form>
    </Modal>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import api from '../services/api';
import Modal from '../components/Modal.vue';
import { validarCampo, hayErrores } from '../utils/validaciones';

const { t } = useI18n();

const placas = ref([]);
const mostrarModal = ref(false);
const editandoId = ref(null);
const error = ref('');
const form = ref(vacio());
const tocados = reactive({ placa: false, categoria: false });

// La placa se valida con regex; la categoria solo debe estar seleccionada.
const errores = computed(() => ({
  placa: validarCampo('placa', form.value.placa),
  categoria: form.value.categoria ? '' : 'validacion.categoria',
}));

function vacio() {
  return { placa: '', categoria: '' };
}

function mostrarError(campo) {
  return errores.value[campo] && (tocados[campo] || form.value[campo]);
}

function claseCampo(campo) {
  if (mostrarError(campo)) return 'invalido';
  return form.value[campo] ? 'valido' : '';
}

function reiniciarTocados() {
  tocados.placa = false;
  tocados.categoria = false;
}

async function cargar() {
  const { data } = await api.listarPlacas();
  placas.value = data;
}

function abrirNuevo() {
  editandoId.value = null;
  form.value = vacio();
  reiniciarTocados();
  error.value = '';
  mostrarModal.value = true;
}

function abrirEditar(p) {
  editandoId.value = p.id;
  form.value = { placa: p.placa, categoria: p.categoria };
  reiniciarTocados();
  error.value = '';
  mostrarModal.value = true;
}

function cerrarModal() {
  mostrarModal.value = false;
}

async function guardar() {
  error.value = '';
  tocados.placa = true;
  tocados.categoria = true;
  if (hayErrores(errores.value)) return;
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
