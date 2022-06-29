import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { SetState } from '@/types';

interface EntryFormProps {
  title: string;
  story: string;
  date: Date;
  setTitle: SetState<string>;
  setStory: SetState<string>;
  setDate: SetState<Date>;
}

export const EntryForm = ({
  title,
  story,
  date,
  setTitle,
  setStory,
  setDate,
}: EntryFormProps) => {
  return (
    <Flex direction='column' gap={5}>
      <FormControl>
        <FormLabel htmlFor='date'>Date</FormLabel>
        <SingleDatepicker
          id='date'
          date={date}
          onDateChange={setDate}
          propsConfigs={{
            inputProps: {
              focusBorderColor: 'linkedin.200',
              borderRadius: 'lg',
            },
            dateNavBtnProps: {
              colorScheme: 'linkedin',
            },
            dayOfMonthBtnProps: {
              defaultBtnProps: {
                _hover: {
                  bg: 'linkedin.300',
                },
              },
              selectedBtnProps: {
                background: 'linkedin.200',
              },
              todayBtnProps: {
                background: 'linkedin.400',
              },
            },
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input
          id='title'
          placeholder='Your entry title here'
          focusBorderColor='linkedin.200'
          borderRadius='lg'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='story'>Story</FormLabel>
        <Textarea
          id='story'
          name='story'
          focusBorderColor='linkedin.200'
          borderRadius='lg'
          placeholder='Describe your day details here.'
          value={story}
          onChange={e => setStory(e.target.value)}
          required
        />
      </FormControl>
    </Flex>
  );
};
