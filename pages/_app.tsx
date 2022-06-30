// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkLoaded, ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider, theme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { chakraTheme } from '@/utils/chakraTheme';
import { DefaultSeo } from 'next-seo';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={chakraTheme}>
        <ClerkProvider {...pageProps}>
          <DefaultSeo
            title="Memoriez - What's in your Memoriez"
            additionalLinkTags={[
              {
                rel: 'icon',
                href: '/logo.png',
              },
            ]}
            twitter={{
              cardType: 'summary_large_image',
              handle: '@MaxProgramming1',
            }}
            openGraph={{
              type: 'website',
              url: 'https://www.memoriez.cc',
              site_name: "Memoriez - What's in your Memoriez",
              images: [
                {
                  url: '/cover.png',
                },
              ],
            }}
          />
          <NextNProgress
            options={{ showSpinner: false }}
            color={theme.colors.whatsapp[200]}
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
