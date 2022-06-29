import { Box, Flex, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { Entry } from '@prisma/client';
import { EntryCard } from './EntryCard';
import NextLink from 'next/link';

export const DiaryEntries = ({
  entries,
  refetch,
}: {
  entries: Entry[];
  refetch: any;
}) => {
  return (
    <Box my='10'>
      <Wrap justify='center' spacing={10} align='center'>
        {entries.map(entry => (
          <WrapItem key={entry.id}>
            <EntryCard refetch={refetch} entry={entry} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
