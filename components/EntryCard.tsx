import {
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Entry } from '@prisma/client';

export const EntryCard = ({ entry }: { entry: Entry }) => {
  return (
    <Flex
      gap={4}
      p='5'
      w='sm'
      minH='sm'
      direction='column'
      borderWidth='1px'
      borderRadius='md'
      borderColor={useColorModeValue('gray.900', 'gray.500')}
      bg={useColorModeValue('gray.100', 'gray.900')}
      transition='all 0.2s ease'
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.700'),
        borderColor: useColorModeValue('gray.700', 'gray.700'),
      }}
      _active={{
        bg: useColorModeValue('gray.400', 'gray.600'),
      }}
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
      <Wrap>
        {entry.tags.map(tag => (
          <WrapItem key={tag}>
            <Tag>{tag}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
