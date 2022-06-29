import type { NextApiRequest, NextApiResponse } from 'next';
import {
  RequireAuthProp,
  requireAuth,
  withAuth,
  WithAuthProp,
} from '@clerk/nextjs/api';
import { z, ZodError } from 'zod';
import { EmojiAPI } from 'emoji-api';
import { prisma } from '@/utils/db';

type Data = {
  success: boolean;
  message: string;
  data?: any;
};

const emoji = new EmojiAPI();
const createSchema = z.object({
  story: z.string().min(1),
  mood: z.string().min(1),
  title: z
    .string()
    .min(1)
    .max(60, { message: 'The title should not exceed 60 characters' }),
  date: z
    .string()
    .min(1)
    .transform(a => new Date(a)),
  tags: z.array(z.string()),
});

async function handler(
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse<Data>
) {
  try {
    const { userId } = req.auth;
    const { title, story, date, mood, tags } = createSchema.parse(req.body);

    console.log({ userId });

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Not logged in',
      });
    }

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
        tags,
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
