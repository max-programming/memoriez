import axios from 'axios';

export const getPhotos = async (query: string, token: string) => {
  const { data } = await axios.get(`/api/photos?q=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
