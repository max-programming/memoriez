import { Tag, TagLabel } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const CustomTag = ({
  closeButton,
  children,
}: {
  closeButton?: ReactNode;
  children: ReactNode;
}) => (
  <Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
    <TagLabel>{children}</TagLabel>
    {closeButton && closeButton}
  </Tag>
);
