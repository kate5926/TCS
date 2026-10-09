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
      <form novalidate @submit.prevent="guardar">
        <div v-for="campo in CAMPOS" :key="campo.nombre" class="campo">
          <input
            v-model="form[campo.nombre]"
            :placeholder="t(campo.placeholder)"
            :class="claseCampo(campo.nombre)"
            @blur="tocados[campo.nombre] = true"
          />
          <small v-if="mostrarError(campo.nombre)" class="campo-error">
            {{ t(errores[campo.nombre]) }}
          </small>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="hayErrores(errores)">
          {{ editandoId ? t('conductores.saveEdit') : t('conductores.saveNew') }}
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
import { validarFormulario, hayErrores } from '../utils/validaciones';

const { t } = useI18n();

// Cada campo del formulario y la regla (regex) que lo valida.
const CAMPOS = [
  { nombre: 'nombre', regla: 'nombre', placeholder: 'conductores.placeholderNombre' },
  { nombre: 'dni', regla: 'dni', placeholder: 'conductores.placeholderDni' },
  { nombre: 'numero_licencia', regla: 'licencia', placeholder: 'conductores.placeholderLicencia' },
];
const REGLAS = Object.fromEntries(CAMPOS.map((c) => [c.nombre, c.regla]));

const conductores = ref([]);
const mostrarModal = ref(false);
const editandoId = ref(null);
const error = ref('');
const form = ref(vacio());
const tocados = reactive({});

// Se recalcula en cada tecla: validacion en vivo.
const errores = computed(() => validarFormulario(form.value, REGLAS));

function vacio() {
  return { nombre: '', dni: '', numero_licencia: '' };
}

// El error se muestra cuando el usuario ya escribio algo o salio del campo.
function mostrarError(campo) {
  return errores.value[campo] && (tocados[campo] || form.value[campo]);
}

function claseCampo(campo) {
  if (mostrarError(campo)) return 'invalido';
  return form.value[campo] ? 'valido' : '';
}

function reiniciarTocados() {
  for (const c of CAMPOS) tocados[c.nombre] = false;
}

async function cargar() {
  const { data } = await api.listarConductores();
  conductores.value = data;
}

function abrirNuevo() {
  editandoId.value = null;
  form.value = vacio();
  reiniciarTocados();
  error.value = '';
  mostrarModal.value = true;
}

function abrirEditar(c) {
  editandoId.value = c.id;
  form.value = { nombre: c.nombre, dni: c.dni, numero_licencia: c.numero_licencia };
  reiniciarTocados();
  error.value = '';
  mostrarModal.value = true;
}

function cerrarModal() {
  mostrarModal.value = false;
}

async function guardar() {
  error.value = '';
  for (const c of CAMPOS) tocados[c.nombre] = true;
  if (hayErrores(errores.value)) return;
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
