import {
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Entry } from '@prisma/client';

export const EntryCard = ({ entry }: { entry: Entry }) => {
  return (
    <Flex
      direction='column'
      gap={4}
      p='5'
      borderWidth='1px'
      borderRadius='md'
      borderColor={useColorModeValue('gray.900', 'gray.500')}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Flex justify={'space-between'} w='full'>
        <Text fontSize='xl'>{format(new Date(entry.date), 'PP')}</Text>
        <Image w='10' h='10' src={entry.mood} alt='mood' />
      </Flex>
      <Heading size='lg'>{entry.title}</Heading>
      <Text>
        {entry.story.length > 250
          ? entry.story.slice(0, 250) + '...'
          : entry.story}
      </Text>
      <Flex gap={2}>
        {/* TODO: SHOW ONLY THE FIRST FOUR TAGS */}
        <Tag>bus</Tag>
        <Tag>college</Tag>
        {/* <Text>...</Text> */}
      </Flex>
    </Flex>
  );
};
