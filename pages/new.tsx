import { Button, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EntryForm, MoodSelector } from '@/components/NewPage';
import { useEntryForm } from '@/hooks/useEntryForm';
import { Layout } from '@/components';

export default function NewPage() {
  const router = useRouter();
  const {
    title,
    story,
    date,
    isLoading,
    setTitle,
    setStory,
    setDate,
    handleSubmit,
  } = useEntryForm();

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        {router.query.p === 'mood' ? (
          <MoodSelector />
        ) : (
          <EntryForm {...{ title, story, date, setTitle, setStory, setDate }} />
        )}
        <Button
          colorScheme='linkedin'
          w='full'
          type='submit'
          mt='5'
          isLoading={isLoading}
          loadingText='ADDING...'
        >
          {router.query.p === 'mood' ? 'ADD' : 'NEXT'}
        </Button>
      </form>
    </Layout>
  );
}
