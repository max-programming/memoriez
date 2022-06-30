import { IPhoto } from '@/types';
import { withAuth, WithAuthProp } from '@clerk/nextjs/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient, PhotosWithTotalResults } from 'pexels';

async function handler(
  req: WithAuthProp<NextApiRequest>,
  res: NextApiResponse
) {
  const { sessionId } = req.auth;
  if (!sessionId) return res.status(401).json({ message: 'Unauthroized' });
  const { q } = req.query;
  const client = createClient(process.env.PEXELS_API_KEY!);
  let data: PhotosWithTotalResults;
  if (!q || q.length === 0 || typeof q !== 'string') {
    data = (await client.photos.curated({
      per_page: 15,
    })) as PhotosWithTotalResults;
  } else {
    data = (await client.photos.search({
      query: q,
      orientation: 'landscape',
    })) as PhotosWithTotalResults;
  }

  const allData = data.photos as IPhoto[];

  const photos = allData.map(photo => ({
    id: photo.id,
    src: photo.src.medium,
    alt: photo.alt,
  }));

  // console.log(allData);

  return res.json(photos);
}

export default withAuth(handler);
// export default handler;
