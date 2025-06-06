import axios from 'axios';
const API_BASE_URL = 'https://ai4mpox.onrender.com/api/v1';
const token = localStorage.getItem('token');

export const fetchItems = (params) => {
  return axios.request({
    method: 'GET',
    url: `${API_BASE_URL}/${params}/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const fetchItem = (params) => {
  return axios.request({
    method: 'GET',
    url: `${API_BASE_URL}/${params}/${item.id || item._id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const deleteItem = (item, params) => {
  return axios.request({
    method: 'DELETE',
    url: `${API_BASE_URL}/${params}/${item.id || item._id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};
