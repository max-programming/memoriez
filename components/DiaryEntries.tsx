import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { Entry } from '@prisma/client';
import { EntryCard } from './EntryCard';

export const DiaryEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box my='10'>
      <Wrap justify='center' spacing={10} align='center'>
        {entries.map(entry => (
          <WrapItem key={entry.id}>
            <EntryCard entry={entry} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
