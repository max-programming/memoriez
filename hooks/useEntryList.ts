import { getEntries } from '@/utils/getEntries';
import { useAuth } from '@clerk/nextjs';
import { Entry } from '@prisma/client';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useEntryList = () => {
  const { getToken } = useAuth();
  return useQuery('entries', async () => {
    const data = await getEntries(await getToken());
    if (!data.success) {
      return [];
    }
    return data.data;
  });
};
