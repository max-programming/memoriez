import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { SetState } from '@/types';
import { TagsInput } from './TagsInput';

interface EntryFormProps {
  title: string;
  story: string;
  date: Date;
  tags: string[];
  setTitle: SetState<string>;
  setStory: SetState<string>;
  setDate: SetState<Date>;
  addTag: (text: string) => void;
  removeTag: (text: string) => void;
}

export const EntryForm = ({
  title,
  story,
  date,
  tags,
  setTitle,
  setStory,
  setDate,
  addTag,
  removeTag,
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
              focusBorderColor: 'whatsapp.200',
              borderRadius: 'lg',
            },
            dateNavBtnProps: {
              colorScheme: 'whatsapp',
            },
            dayOfMonthBtnProps: {
              defaultBtnProps: {
                _hover: {
                  bg: 'whatsapp.300',
                },
              },
              selectedBtnProps: {
                background: 'whatsapp.200',
              },
              todayBtnProps: {
                background: 'whatsapp.400',
              },
            },
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input
          id='title'
          placeholder='Enter a good title!'
          focusBorderColor='whatsapp.200'
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
          focusBorderColor='whatsapp.200'
          borderRadius='lg'
          placeholder='Describe your day details here.'
          value={story}
          onChange={e => setStory(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='tags'>Tags</FormLabel>
        <Box>
          <TagsInput addTag={addTag} />
          <Wrap gap={4} pt='5'>
            {tags.map((tag, i) => (
              <WrapItem key={i}>
                <Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(tag)} />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </FormControl>
    </Flex>
  );
};
