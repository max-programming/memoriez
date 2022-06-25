import { Box, Flex } from '@chakra-ui/react';
import { Entry } from '@prisma/client';
import { EntryCard } from './EntryCard';

export const DiaryEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box my='4'>
      <Flex gap={5} direction='column'>
        {entries.map(entry => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </Flex>
    </Box>
  );
};
