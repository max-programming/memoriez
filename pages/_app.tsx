// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ClerkLoaded,
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { ChakraProvider, theme } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { chakraTheme } from '@/utils/chakraTheme';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={chakraTheme}>
        <ClerkProvider {...pageProps}>
          {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
            process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
              <Script
                src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
                strategy='lazyOnload'
              />
            )}
          <DefaultSeo
            title='Memoriez - A quick and easy journal'
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
              site_name: 'Memoriez - A quick and easy journal',
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
          {router.pathname === '/new' ? (
            <ClerkLoaded>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
            </ClerkLoaded>
          ) : (
            <ClerkLoaded>
              <Component {...pageProps} />
            </ClerkLoaded>
          )}
        </ClerkProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
