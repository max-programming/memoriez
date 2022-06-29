import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

export const useEntryForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    setIsLoading(true);
    if (router.query.p !== 'mood') return router.push('/new?p=mood');
    if (!title || !story || title.trim() === '' || story.trim() === '') {
      await router.push('/new');
      setIsLoading(false);
      return toast({
        title: 'Please enter the title and story',
        status: 'error',
      });
    }

    const mood = formData.get('mood') as string | null; // Only gets the emoji from the mood
    if (!mood || mood.trim() === '')
      return toast({ title: 'Please select your mood', status: 'error' });

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
