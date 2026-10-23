import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
export const submitContactMessage = payload => axios.post(API_URL + '/api/contact/', payload);
export default API_URL;
