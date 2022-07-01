import { SetState } from '@/types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconProps,
  Icon,
  Input,
  Box,
  Center,
  theme,
  Grid,
  GridItem,
  Image,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { KeyboardEventHandler, useState } from 'react';
import { useQuery } from 'react-query';
import Loader from 'react-spinners/PulseLoader';

interface Props {
  selectedPhoto?: string;
  setSelectedPhoto: SetState<string | undefined>;
}

export const CoverImageSelector = ({
  selectedPhoto,
  setSelectedPhoto,
}: Props) => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  const { data: photos } = useQuery<
    {
      id: number;
      src: string;
      alt: string;
    }[]
  >(['photos', query], () =>
    axios.get(`/api/photos?q=${query}`).then(res => res.data)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuery(input);
    }
  };

  return (
    <>
      <Flex align='center' justify='center'>
        {!selectedPhoto ||
          (selectedPhoto.length !== 0 && (
            <Image w='28' src={selectedPhoto} alt='' mr='5' />
          ))}
        <Button onClick={onOpen} leftIcon={<PexelsIcon />}>
          Pick a cover image
        </Button>
      </Flex>

      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cover Image (Pexels)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              focusBorderColor='whatsapp.200'
              placeholder='Search...'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleSubmit}
            />
            <Box>
              {!photos && (
                <Center mt='5'>
                  <Loader color={theme.colors.whatsapp[200]} />
                </Center>
              )}
              {photos && (
                <Grid
                  gap={5}
                  mt='10'
                  templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(3, 1fr)',
                  }}
                >
                  {photos.map(photo => (
                    <GridItem
                      key={photo.id}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      flexDir='column'
                      cursor='pointer'
                    >
                      <Tooltip placement='top' label={photo.alt} hasArrow>
                        <Image
                          shadow='md'
                          rounded='md'
                          borderWidth={selectedPhoto === photo.src ? '4px' : 0}
                          borderColor={
                            selectedPhoto === photo.src
                              ? 'whatsapp.200'
                              : 'black'
                          }
                          borderStyle='solid'
                          src={photo.src}
                          alt={photo.alt}
                          onClick={() => {
                            setSelectedPhoto('');
                            setSelectedPhoto(photo.src);
                          }}
                        />
                      </Tooltip>
                    </GridItem>
                  ))}
                </Grid>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const PexelsIcon = (props: IconProps) => (
  <Icon fill='#05A081' boxSize='6' {...props}>
    <path d='M1.5 0A1.5 1.5 0 000 1.5v21A1.5 1.5 0 001.5 24h21a1.5 1.5 0 001.5-1.5v-21A1.5 1.5 0 0022.5 0h-21zm6.75 6.75h5.2715a3.843 3.843 0 01.627 7.6348V17.25H8.25V6.75zm1.5 1.5v7.5h2.8984v-2.8145h.873a2.343 2.343 0 100-4.6855H9.75Z' />
  </Icon>
);
