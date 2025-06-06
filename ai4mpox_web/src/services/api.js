import ApiManager from './ApiManager';

export const fetchItems = async (params) => {
  try {
    const result = await ApiManager(`/api/v1/${params}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};
