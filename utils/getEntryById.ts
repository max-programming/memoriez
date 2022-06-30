import { prisma } from '@/utils/db';

export const getEntryById = async (id: string) => {
  const data = await prisma.entry.findUnique({ where: { id } });
  const entry = JSON.parse(JSON.stringify(data));

  return entry;
};
