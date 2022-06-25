import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

export const useEntryForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
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

    console.log('creating...');
    const { data } = await axios.post('/api/createEntry', {
      title,
      story,
      mood,
      date,
    });
    console.log({ data });
    router.push('/');
  };

  return {
    title,
    story,
    date,
    setTitle,
    setStory,
    setDate,
    handleSubmit,
  };
};
