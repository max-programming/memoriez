import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { GetServerSideProps } from 'next';
import { getEntryById } from '@/utils/getEntryById';
import { Layout } from '@/components';
import { useEntryForm } from '@/hooks/useEntryForm';
import { useRouter } from 'next/router';
import { EntryForm, MoodSelector } from '@/components/NewPage';
import { Button } from '@chakra-ui/react';
import { Entry } from '@prisma/client';

export default function EntryEditPage({ entry }: { entry: Entry }) {
  const router = useRouter();
  const entryFormProps = useEntryForm({ isEditing: true, entry });

  return (
    <>
      <Layout>
        <form onSubmit={entryFormProps.handleSubmit}>
          {router.query.p === 'mood' ? (
            <MoodSelector
              mood={entryFormProps.mood}
              setMood={entryFormProps.setMood}
            />
          ) : (
            <EntryForm {...entryFormProps} />
          )}
          <Button
            colorScheme='whatsapp'
            w='full'
            type='submit'
            mt='5'
            isLoading={entryFormProps.isLoading}
            loadingText='UPDATING...'
          >
            {router.query.p === 'mood' ? 'UPDATE' : 'NEXT'}
          </Button>
        </form>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req, query }) => {
    const entryId = query.entryId as string;
    const { userId } = req.auth;
    if (!userId) return { notFound: true };
    const entry = await getEntryById(entryId);
    if (entry?.userId !== userId) return { notFound: true };

    return {
      props: {
        entry,
      },
    };
  },
  { loadUser: true }
);
