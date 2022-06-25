import { Entry } from '@prisma/client';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useEntryList = () => {
  return useQuery('entries', async () => {
    const { data } = await axios.get<{
      success: boolean;
      message: string;
      data: Entry[];
    }>('/api/entries');
    if (!data.success) {
      return [];
    }
    return data.data;
  });
};
