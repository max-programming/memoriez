// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider, theme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ClerkProvider {...pageProps}>
        <NextNProgress
          options={{ showSpinner: false }}
          color={theme.colors.linkedin[200]}
        />
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
}

export default MyApp;
