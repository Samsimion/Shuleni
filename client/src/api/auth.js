// Auth-specific API calls

import api from './axios';

export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const registerUser = async (userInfo) => {
  const res = await api.post('/auth/register', userInfo);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data;
};
