import { useToast } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { Entry } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const defaultMood = (mood: string) => {
  if (mood.includes('confounded-face')) return '😖 Very Bad';
  if (mood.includes('tired-face')) return '😫 Bad';
  if (mood.includes('neutral-face')) return '😐 Normal';
  if (mood.includes('slightly-smiling-face')) return '🙂 Nice';
  if (mood.includes('star-struck')) return '🤩 Woop woop';
  return '';
};

interface UseEntryFormProps {
  isEditing: boolean;
  entry: Entry;
}

export const useEntryForm = ({
  isEditing,
  entry,
}: Partial<UseEntryFormProps>) => {
  const router = useRouter();
  const toast = useToast();
  const { isSignedIn, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(isEditing ? entry?.title! : '');
  const [story, setStory] = useState(isEditing ? entry?.story! : '');
  const [date, setDate] = useState(isEditing ? entry?.date! : new Date());
  const [tags, setTags] = useState<string[]>(
    isEditing ? entry?.tags.split(',')! : []
  );
  const [selectedPhoto, setSelectedPhoto] = useState(
    isEditing ? entry?.coverImage! : undefined
  );
  const [mood, setMood] = useState(isEditing ? defaultMood(entry?.mood!) : '');

  const addTag = (text: string) => {
    const existingTag = tags.find(tag => tag === text.toLowerCase());
    if (!existingTag) setTags(prevTags => [...prevTags, text.toLowerCase()]);
  };

  const removeTag = (text: string) => {
    const filteredTags = tags.filter(tag => tag !== text);
    setTags(filteredTags);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignedIn) {
      console.log("User isn't signed in ");
      return router.push('/');
    }
    const formData = new FormData(e.target as HTMLFormElement);

    if (router.query.p !== 'mood')
      return router.push(
        isEditing ? `/entry/edit/${entry?.id}?p=mood` : '/new?p=mood'
      );
    if (!title || !story || title.trim() === '' || story.trim() === '') {
      await router.push(isEditing ? `/entry/edit/${entry?.id}` : '/new');
      return toast({
        title: 'Please enter the title and story',
        status: 'error',
      });
    }

    // const mood = formData.get('mood') as string | null; // Only gets the emoji from the mood
    if (!mood || mood.trim() === '')
      return toast({ title: 'Please select your mood', status: 'error' });

    setIsLoading(true);
    console.log('creating...');
    const { data } = await axios.post(
      isEditing ? `/api/editEntry?id=${entry?.id}` : '/api/createEntry',
      {
        title,
        story,
        mood: mood.split(' ')[0],
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
    mood,
    addTag,
    removeTag,
    setTitle,
    setStory,
    setDate,
    setMood,
    handleSubmit,
    setSelectedPhoto,
  };
};
