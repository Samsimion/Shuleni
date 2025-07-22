import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const createSubmission = async (data) => {
  const res = await axios.post(`${API_BASE}/submissions`, data);
  return res.data;
};

export const fetchSubmissions = async () => {
  const res = await axios.get(`${API_BASE}/submissions`);
  return res.data;
};
