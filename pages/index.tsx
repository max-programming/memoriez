import { Button, Flex, theme } from '@chakra-ui/react';
import { DiaryEntries, Layout } from '@/components';
import Link from 'next/link';
import { useEntryList } from '@/hooks/useEntryList';
import { HashLoader } from 'react-spinners';

export default function HomePage() {
  const { isLoading, data } = useEntryList();
  return (
    <Layout>
      <Link href='/new'>
        <a>
          <Button mt='5' colorScheme='linkedin' width='full'>
            NEW ENTRY
          </Button>
        </a>
      </Link>
      {isLoading ? (
        <Flex justify='center' mt='20'>
          <HashLoader color={theme.colors.linkedin[200]} size={75} />
        </Flex>
      ) : (
        <DiaryEntries entries={data!} />
      )}
    </Layout>
  );
}
