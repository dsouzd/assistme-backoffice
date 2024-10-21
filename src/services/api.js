// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000';

export const login = (username, password) => {
  return axios.post(`${API_BASE_URL}/login`, { username, password });
};

export const fetchDocuments = (department) => {
  return axios.get(`${API_BASE_URL}/list`, {
    params: { department },
  });
};

export const deleteFile = (department, filename) => {
  return axios.delete(`${API_BASE_URL}/filedelete`, {
    params: { department, filename },
  });
};

export const uploadFile = (department, version, tags, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${API_BASE_URL}/fileupload`, formData, {
    params: { department, version, tags },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateFile = (department, version, tags, file) => {
  const formData = new FormData();
  return axios.post(`${API_BASE_URL}/fileupdate`, formData, {
    params: { department, version, tags },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
