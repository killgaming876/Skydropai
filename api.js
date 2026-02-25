import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  const response = await API.post('/token', formData);
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await API.post(`/register?username=${username}&email=${email}&password=${password}`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get('/user/me');
  return response.data;
};

export const scanViral = async () => {
  const response = await API.get('/scan-viral');
  return response.data;
};

export const scanMarketplace = async (productName) => {
  const response = await API.post('/marketplace-scan', { product_name: productName });
  return response.data;
};

export const calculateProfit = async (data) => {
  const response = await API.post('/profit-calc', data);
  return response.data;
};

export const generateScript = async (data) => {
  const response = await API.post('/generate-script', data);
  return response.data;
};

export const generateHashtags = async (data) => {
  const response = await API.post('/generate-hashtags', data);
  return response.data;
};

export const analyzeCompetitor = async (handle) => {
  const response = await API.post('/competitor-analyze', { instagram_handle: handle });
  return response.data;
};

export const generateVideo = async (data) => {
  const response = await API.post('/generate-video', data);
  return response.data;
};

export const getTrendAlerts = async () => {
  const response = await API.get('/trend-alerts');
  return response.data;
};

export default API;
