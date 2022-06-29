import { Box, Flex, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { Entry } from '@prisma/client';
import { EntryCard } from './EntryCard';
import NextLink from 'next/link';

export const DiaryEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box my='10'>
      <Wrap justify='center' spacing={10} align='center'>
        {entries.map(entry => (
          <NextLink href={`/entry/${entry.id}`} key={entry.id} passHref>
            <Link _hover={{ textDecor: 'none' }}>
              <WrapItem>
                <EntryCard entry={entry} />
              </WrapItem>
            </Link>
          </NextLink>
        ))}
      </Wrap>
    </Box>
  );
};
