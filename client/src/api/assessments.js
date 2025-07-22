import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchAssessments = async () => {
  const res = await axios.get(`${API_BASE}/assessments`);
  return res.data;
};

export const createAssessment = async (data) => {
  const res = await axios.post(`${API_BASE}/assessments`, data);
  return res.data;
};

export const fetchAssessmentById = async (id) => {
  const res = await axios.get(`${API_BASE}/assessments/${id}`);
  return res.data;
};
