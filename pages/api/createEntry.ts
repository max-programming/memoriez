import type { NextApiRequest, NextApiResponse } from 'next';
import { RequireAuthProp, requireAuth } from '@clerk/nextjs/api';
import { z, ZodError } from 'zod';
import { EmojiAPI } from 'emoji-api';
import prismaClient from '@/utils/prismaClient';

type Data = {
  success: boolean;
  message: string;
  data?: any;
};

const prisma = prismaClient();
const emoji = new EmojiAPI();
const createSchema = z.object({
  title: z.string().min(1),
  story: z.string().min(1),
  mood: z.string().min(1),
  date: z
    .string()
    .min(1)
    .transform(a => new Date(a)),
});

async function handler(
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse<Data>
) {
  try {
    const { userId } = req.auth;
    const { title, story, date, mood } = createSchema.parse(req.body);

    const {
      Twitter: { url },
    } = await emoji.get(mood.split(' ')[0]);

    const createdEntry = await prisma.entry.create({
      data: {
        mood: url,
        date,
        title,
        story,
        userId,
      },
    });

    return res.json({
      success: true,
      message: 'Entry successfully created',
      data: createdEntry,
    });
  } catch (error) {
    console.error({ error });
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default requireAuth(handler);
