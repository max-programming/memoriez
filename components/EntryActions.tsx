import { Flex, IconButton } from '@chakra-ui/react';
import { FaPenAlt, FaTrash } from 'react-icons/fa';

export const EntryActions = () => {
  return (
    <>
      <Flex p='3' align='center' justify='flex-end' gap={5}>
        <IconButton
          variant='ghost'
          size='lg'
          icon={<FaPenAlt />}
          colorScheme='blue'
          aria-label='Edit'
        />

        <IconButton
          variant='ghost'
          size='lg'
          icon={<FaTrash />}
          colorScheme='red'
          aria-label='Remove'
        />
      </Flex>
    </>
  );
};
