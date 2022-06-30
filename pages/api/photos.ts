import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient, Photo, PhotosWithTotalResults } from 'pexels';

interface IPhoto extends Photo {
  alt: string;
}

async function handler(
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
) {
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
    src: photo.src.original + '?auto=compress',
    alt: photo.alt,
  }));

  return res.json(photos);
}

export default requireAuth(handler);
// export default handler;
