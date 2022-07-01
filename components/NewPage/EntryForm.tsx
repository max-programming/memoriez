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
import { CoverImageSelector } from './CoverImageSelector';
import { CustomTag } from '../CustomTag';

interface EntryFormProps {
  title: string;
  story: string;
  date: Date;
  tags: string[];
  selectedPhoto?: string;
  setTitle: SetState<string>;
  setStory: SetState<string>;
  setSelectedPhoto: SetState<string | undefined>;
  setDate: SetState<Date>;
  addTag: (text: string) => void;
  removeTag: (text: string) => void;
}

export const EntryForm = (props: EntryFormProps) => {
  return (
    <Flex direction='column' gap={5}>
      <CoverImageSelector
        selectedPhoto={props.selectedPhoto}
        setSelectedPhoto={props.setSelectedPhoto}
      />
      <FormControl>
        <FormLabel htmlFor='date'>Date</FormLabel>
        <SingleDatepicker
          id='date'
          date={new Date(props.date)}
          onDateChange={props.setDate}
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
          value={props.title}
          onChange={e => props.setTitle(e.target.value)}
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
          value={props.story}
          onChange={e => props.setStory(e.target.value)}
          rows={15}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='tags'>Tags</FormLabel>
        <Box>
          <TagsInput addTag={props.addTag} />
          <Wrap gap={4} pt='5'>
            {props.tags.map((tag, i) => (
              <WrapItem key={i}>
                <CustomTag
                  closeButton={
                    <TagCloseButton onClick={() => props.removeTag(tag)} />
                  }
                >
                  {tag}
                </CustomTag>{' '}
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </FormControl>
    </Flex>
  );
};
