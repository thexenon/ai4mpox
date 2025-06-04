import ApiManager from './ApiManager';

export const fetchItems = async (params) => {
  try {
    const result = await ApiManager(`/api/v1/${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};
