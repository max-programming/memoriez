import { Button, Container } from '@chakra-ui/react';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { Entry } from '@prisma/client';
import { DiaryEntries, Layout } from '@/components';
import Link from 'next/link';
import prismaClient from '@/utils/prismaClient';

const prisma = prismaClient();

export default function HomePage({ entries }: { entries: Entry[] }) {
  return (
    <Layout>
      <Link href='/new'>
        <a>
          <Button colorScheme='linkedin' width='full'>
            NEW ENTRY
          </Button>
        </a>
      </Link>
      <DiaryEntries entries={entries} />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req }) => {
  const { userId } = req.auth;

  if (!userId) return { props: { entries: [] } };

  try {
    const data = await prisma.entry.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    const entries = JSON.parse(JSON.stringify(data));

    console.log({ entries });

    return {
      props: {
        entries,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        entries: [],
      },
    };
  }
});
