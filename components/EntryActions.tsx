import { getEntries } from '@/utils/getEntries';
import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useState } from 'react';
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import NextLink from 'next/link';

export const EntryActions = ({
  entryId,
  refetch,
}: {
  entryId: string;
  refetch: any;
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <Flex p='3' align='center' justify='flex-end' gap={5}>
        <NextLink passHref href={`/entry/edit/${entryId}`}>
          <IconButton
            as={Link}
            variant='ghost'
            size='lg'
            icon={<FaPenAlt />}
            colorScheme='blue'
            aria-label='Edit'
          />
        </NextLink>
        <IconButton
          variant='ghost'
          size='lg'
          icon={<FaTrash />}
          colorScheme='red'
          aria-label='Remove'
          onClick={onOpen}
        />

        <DeleteModal
          refetch={refetch}
          isOpen={isOpen}
          onClose={onClose}
          entryId={entryId}
        />
      </Flex>
    </>
  );
};

const DeleteModal = ({
  isOpen,
  onClose,
  entryId,
  refetch,
}: UseModalProps & { entryId: string; refetch: any }) => {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const deleteEntry = async () => {
    setIsLoading(true);
    const token = await getToken();
    await axios.post(
      '/api/deleteEntry',
      {
        entryId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await refetch();
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this entry? This action is
          irreversible
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant='ghost'
            colorScheme='red'
            leftIcon={<FaTrash />}
            onClick={deleteEntry}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
