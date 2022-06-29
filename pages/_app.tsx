// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkLoaded, ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider, theme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ClerkProvider {...pageProps}>
          <NextNProgress
            options={{ showSpinner: false }}
            color={theme.colors.linkedin[200]}
          />
          <ClerkLoaded>
            <Component {...pageProps} />
          </ClerkLoaded>
        </ClerkProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
