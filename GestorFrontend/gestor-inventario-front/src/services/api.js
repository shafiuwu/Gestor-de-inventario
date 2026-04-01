import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta al puerto de tu Node.js
});

export const getProductos = () => api.get('/productos');
export const crearMovimiento = (data) => api.post('/movimientos', data);

export default api;