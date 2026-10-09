import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

// sesionId simple en memoria del navegador, usado por el limitador de
// intentos de registro (funcion stateful del backend)
const sesionId = `sesion-${Math.random().toString(36).slice(2)}`;
api.defaults.headers.common['x-sesion-id'] = sesionId;

export default {
  listarPlacas: () => api.get('/placas'),
  crearPlaca: (data) => api.post('/placas', data),
  actualizarPlaca: (id, data) => api.put(`/placas/${id}`, data),
  eliminarPlaca: (id) => api.delete(`/placas/${id}`),

  listarConductores: () => api.get('/conductores'),
  crearConductor: (data) => api.post('/conductores', data),
  actualizarConductor: (id, data) => api.put(`/conductores/${id}`, data),
  eliminarConductor: (id) => api.delete(`/conductores/${id}`),
};
