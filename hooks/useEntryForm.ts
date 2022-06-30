import { useToast } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useState } from 'react';

export const useEntryForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { isSignedIn, userId, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const addTag = (text: string) => {
    const existingTag = tags.find(tag => tag === text.toLowerCase());
    if (!existingTag) setTags(prevTags => [...prevTags, text.toLowerCase()]);
  };

  const removeTag = (text: string) => {
    const filteredTags = tags.filter(tag => tag !== text);
    setTags(filteredTags);
  };

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
    const { data } = await axios.post(
      '/api/createEntry',
      {
        title,
        story,
        mood,
        date,
        tags,
        coverImage: selectedPhoto,
      },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );
    console.log({ data });
    await router.push('/');
    setIsLoading(false);
  };

  return {
    tags,
    title,
    story,
    date,
    selectedPhoto,
    isLoading,
    addTag,
    removeTag,
    setTitle,
    setStory,
    setDate,
    handleSubmit,
    setSelectedPhoto,
  };
};
