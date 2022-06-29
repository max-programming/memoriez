import { Entry } from '@prisma/client';
import axios from 'axios';

export const getEntries = async (token: string | null) => {
  const { data } = await axios.get<{
    success: boolean;
    message: string;
    data: Entry[];
  }>('/api/entries', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
