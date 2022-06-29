import { useAuth } from '@clerk/nextjs';
import { Entry } from '@prisma/client';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useEntryList = () => {
  const { getToken } = useAuth();
  return useQuery('entries', async () => {
    const { data } = await axios.get<{
      success: boolean;
      message: string;
      data: Entry[];
    }>('/api/entries', {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!data.success) {
      return [];
    }
    return data.data;
  });
};
