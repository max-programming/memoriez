import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Container my='4' maxW='container.lg'>
        {children}
      </Container>
    </>
  );
};
