import { Button, Flex, Heading, Image, theme } from '@chakra-ui/react';
import { DiaryEntries, Layout } from '@/components';
import { useEntryList } from '@/hooks/useEntryList';
import { HashLoader } from 'react-spinners';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <Layout>
      <SignedIn>
        <Flex align='center' flexDir='column' justify='center'>
          <Link href='/new'>
            <a>
              <Button
                mt='5'
                colorScheme='whatsapp'
                width={{ base: 'xs', md: 'md' }}
                leftIcon={<FaPlus />}
              >
                NEW ENTRY
              </Button>
            </a>
          </Link>
          <SignedInHome />
        </Flex>
      </SignedIn>
      <SignedOut>
        <Flex flexDir='column' align='center'>
          <Image src='/noentries.svg' alt='' w={{ base: 'xs', md: 'xl' }} />
          <Heading mt='10'>
            <SignInButton mode='modal'>Sign in</SignInButton> to create entries
          </Heading>
        </Flex>
      </SignedOut>
    </Layout>
  );
}

const SignedInHome = () => {
  const { isLoading, data, refetch } = useEntryList();

  return (
    <>
      {isLoading ? (
        <Flex justify='center' mt='20'>
          <HashLoader color={theme.colors.whatsapp[200]} size={75} />
        </Flex>
      ) : (
        <DiaryEntries refetch={refetch} entries={data || []} />
      )}
    </>
  );
};
