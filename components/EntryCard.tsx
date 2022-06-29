import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Tag,
  Link,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Entry } from '@prisma/client';
import { EntryActions } from './EntryActions';
import NextLink from 'next/link';

export const EntryCard = ({
  entry,
  refetch,
}: {
  entry: Entry;
  refetch: any;
}) => {
  return (
    <Flex
      w='sm'
      h='md'
      direction='column'
      borderWidth='1px'
      borderRadius='md'
      justify='space-between'
      borderColor={useColorModeValue('gray.900', 'gray.500')}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <NextLink href={`/entry/${entry.id}`} key={entry.id} passHref>
        <Flex
          as={Link}
          flex={2}
          p='5'
          gap={4}
          transition='all 0.2s ease'
          direction='column'
          _hover={{
            textDecor: 'none',
            bg: useColorModeValue('gray.300', 'gray.700'),
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
            {entry.tags.split(',').map(tag => (
              <WrapItem key={tag}>
                <Tag>{tag}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </NextLink>
      <Divider />
      <EntryActions refetch={refetch} entryId={entry.id} />
    </Flex>
  );
};
