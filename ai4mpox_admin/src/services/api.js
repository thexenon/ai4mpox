import axios from 'axios';
const API_BASE_URL = 'https://ai4mpox.onrender.com/api/v1';

export const fetchItems = (params, cookie) => {
  return axios.request({
    method: 'GET',
    url: `${API_BASE_URL}/${params}/`,
    headers: cookie ? { Cookie: cookie } : {},
    withCredentials: true,
  });
};

export const fetchItem = (params, cookie) => {
  return axios.request({
    method: 'GET',
    url: `${API_BASE_URL}/${params}/${item.id || item._id}`,
    headers: cookie ? { Cookie: cookie } : {},
    withCredentials: true,
  });
};

export const deleteItem = (item, params, cookie) => {
  return axios.request({
    method: 'DELETE',
    url: `${API_BASE_URL}/${params}/${item.id || item._id}`,
    headers: cookie ? { Cookie: cookie } : {},
    withCredentials: true,
  });
};
