import { Button, Flex, theme } from '@chakra-ui/react';
import { DiaryEntries, Layout } from '@/components';
import { useEntryList } from '@/hooks/useEntryList';
import { HashLoader } from 'react-spinners';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function HomePage() {
  const { isLoading, data } = useEntryList();

  return (
    <Layout>
      <Flex justify='center'>
        <Link href='/new'>
          <a>
            <Button
              mt='5'
              colorScheme='whatsapp'
              width='md'
              leftIcon={<FaPlus />}
            >
              NEW ENTRY
            </Button>
          </a>
        </Link>
      </Flex>
      {isLoading ? (
        <Flex justify='center' mt='20'>
          <HashLoader color={theme.colors.whatsapp[200]} size={75} />
        </Flex>
      ) : (
        <DiaryEntries entries={data || []} />
      )}
    </Layout>
  );
}
