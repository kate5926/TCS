import { createRouter, createWebHistory } from 'vue-router';
import InicioView from './views/InicioView.vue';
import PlacasView from './views/PlacasView.vue';
import ConductoresView from './views/ConductoresView.vue';
import CuestionarioView from './views/CuestionarioView.vue';

const routes = [
  { path: '/', name: 'inicio', component: InicioView, meta: { titulo: 'Inicio' } },
  { path: '/placas', name: 'placas', component: PlacasView, meta: { titulo: 'Registro de Placas' } },
  { path: '/conductores', name: 'conductores', component: ConductoresView, meta: { titulo: 'Registro de Conductores' } },
  { path: '/cuestionario', name: 'cuestionario', component: CuestionarioView, meta: { titulo: 'Cuestionario' } },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
