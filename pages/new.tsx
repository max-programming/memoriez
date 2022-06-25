import { Button, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EntryForm, MoodSelector } from '@/components/NewPage';
import { useEntryForm } from '@/hooks/useEntryForm';

export default function NewPage() {
  const router = useRouter();
  const { title, story, date, setTitle, setStory, setDate, handleSubmit } =
    useEntryForm();

  return (
    <Container my='4'>
      <form onSubmit={handleSubmit}>
        {router.query.p === 'mood' ? (
          <MoodSelector />
        ) : (
          <EntryForm {...{ title, story, date, setTitle, setStory, setDate }} />
        )}
        <Button colorScheme='linkedin' w='full' type='submit' mt='5'>
          {router.query.p === 'mood' ? 'SUBMIT' : 'NEXT'}
        </Button>
      </form>
    </Container>
  );
}
