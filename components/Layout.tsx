import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <script
          async
          defer
          data-website-id='4b493259-b01a-4728-976a-c357291ec12e'
          src='https://analytics.usman-s.me/umami.js'
        ></script>
      </Head>
      <Navbar />
      <Container my='4' maxW='container.lg'>
        {children}
      </Container>
    </>
  );
};
