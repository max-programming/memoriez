import prismaClient from '@/utils/prismaClient';
import {
  requireAuth,
  RequireAuthProp,
  withAuth,
  WithAuthProp,
} from '@clerk/nextjs/api';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = prismaClient();

async function handler(
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) {
  const { userId } = req.auth;
  console.log({ userId });
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: 'User not logged in' });
  }
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
    res.json({
      success: false,
      message: 'Entries not found ' + userId,
      data: [],
    });
  }
}

export default requireAuth(handler);
