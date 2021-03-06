import { useRadio, UseRadioProps, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const RadioCard = (props: UseRadioProps & { children: ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='lg'
        borderColor='gray.600'
        _checked={{
          bg: 'whatsapp.600',
          color: 'white',
          borderColor: 'gray.200',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        transition='all 0.3s ease-in-out'
        px={5}
        py={4}
        my={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
