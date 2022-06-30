import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { GetServerSideProps } from 'next';
import { prisma } from '@/utils/db';
import { Entry } from '@prisma/client';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CustomTag, Layout } from '@/components';

export default function EntryPage({ entry }: { entry: Entry }) {
  const tags = entry.tags.split(',');
  return (
    <>
      <Layout>
        <Flex flexDir='column' align='center'>
          <Image src={entry.coverImage || ''} alt='' />
          <Heading textAlign='center' mt='5'>
            {entry.title}
          </Heading>
          <Divider my='2' />
          <Text lineHeight='tall'>{entry.story}</Text>
          <Divider my='2' />
          <Wrap>
            {tags.map(tag => (
              <WrapItem key={tag}>
                <CustomTag>{tag}</CustomTag>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req, query }) => {
    const entryId = query.entryId as string;
    const { userId } = req.auth;
    if (!userId) return { notFound: true };
    const data = await prisma.entry.findUnique({ where: { id: entryId } });
    if (data?.userId !== userId) return { notFound: true };

    return {
      props: {
        entry: JSON.parse(JSON.stringify(data)),
      },
    };
  },
  { loadUser: true }
);
