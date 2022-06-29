import { useToast } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

export const useEntryForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { isSignedIn, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    console.log({ userId, isSignedIn });
    if (!isSignedIn) {
      console.log("User isn't signed in ");
      return router.push('/');
    }
    const formData = new FormData(e.target as HTMLFormElement);

    if (router.query.p !== 'mood') return router.push('/new?p=mood');
    if (!title || !story || title.trim() === '' || story.trim() === '') {
      await router.push('/new');
      return toast({
        title: 'Please enter the title and story',
        status: 'error',
      });
    }

    const mood = formData.get('mood') as string | null; // Only gets the emoji from the mood
    if (!mood || mood.trim() === '')
      return toast({ title: 'Please select your mood', status: 'error' });

    setIsLoading(true);
    console.log('creating...');
    const { data } = await axios.post('/api/createEntry', {
      title,
      story,
      mood,
      date,
    });
    console.log({ data });
    await router.push('/');
    setIsLoading(false);
  };

  return {
    title,
    story,
    date,
    isLoading,
    setTitle,
    setStory,
    setDate,
    handleSubmit,
  };
};
