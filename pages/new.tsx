import { Button, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EntryForm, MoodSelector } from '@/components/NewPage';
import { useEntryForm } from '@/hooks/useEntryForm';
import { Layout } from '@/components';

export default function NewPage() {
  const router = useRouter();
  const entryFormProps = useEntryForm();

  return (
    <Layout>
      <form onSubmit={entryFormProps.handleSubmit}>
        {router.query.p === 'mood' ? (
          <MoodSelector />
        ) : (
          <EntryForm {...entryFormProps} />
        )}
        <Button
          colorScheme='whatsapp'
          w='full'
          type='submit'
          mt='5'
          isLoading={entryFormProps.isLoading}
          loadingText='ADDING...'
        >
          {router.query.p === 'mood' ? 'ADD' : 'NEXT'}
        </Button>
      </form>
    </Layout>
  );
}
