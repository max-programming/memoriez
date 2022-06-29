import { prisma } from '@/utils/db';
import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const deleteSchema = z.object({ entryId: z.string().min(1) });

async function handler(
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) {
  try {
    const { entryId } = deleteSchema.parse(req.body);
    const deletedEntry = await prisma.entry.delete({ where: { id: entryId } });
    res.json({
      success: true,
      message: 'Entry successfully deleted',
      data: deletedEntry,
    });
  } catch (err) {
    console.error({ err });
  }
}

export default requireAuth(handler);
