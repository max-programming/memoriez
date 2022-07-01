import { Box, Flex, Heading, Image, Wrap, WrapItem } from '@chakra-ui/react';
import { Entry } from '@prisma/client';
import { EntryCard } from './EntryCard';

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
        {entries.length === 0 || !entries ? (
          <Flex flexDir='column' align='center'>
            <Image src='/noentries.svg' alt='' w={{ base: 'xs', md: 'xl' }} />
            <Heading mt='10'>No Entries Here</Heading>
          </Flex>
        ) : (
          entries.map(entry => (
            <WrapItem key={entry.id}>
              <EntryCard refetch={refetch} entry={entry} />
            </WrapItem>
          ))
        )}
      </Wrap>
    </Box>
  );
};
