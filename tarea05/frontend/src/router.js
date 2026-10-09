import { createRouter, createWebHistory } from 'vue-router';
import InicioView from './views/InicioView.vue';
import PlacasView from './views/PlacasView.vue';
import ConductoresView from './views/ConductoresView.vue';
import ClimaView from './views/ClimaView.vue';

const routes = [
  { path: '/', name: 'inicio', component: InicioView, meta: { tituloKey: 'nav.inicio' } },
  { path: '/placas', name: 'placas', component: PlacasView, meta: { tituloKey: 'nav.placas' } },
  { path: '/conductores', name: 'conductores', component: ConductoresView, meta: { tituloKey: 'nav.conductores' } },
  { path: '/clima', name: 'clima', component: ClimaView, meta: { tituloKey: 'nav.clima' } },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
