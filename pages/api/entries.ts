import prismaClient from '@/utils/prismaClient';
import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = prismaClient();

async function handler(
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) {
  const { userId } = req.auth;
  try {
    const data = await prisma.entry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    const entries = JSON.parse(JSON.stringify(data));

    res.json({
      success: true,
      message: 'Entries found for user ' + userId,
      data: entries,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Entries not found' + userId });
  }
}

export default requireAuth(handler);
