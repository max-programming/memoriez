import { SetState } from '@/types';
import {
  Button,
  Heading,
  RadioGroup,
  Stack,
  StackProps,
  useRadioGroup,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import { RadioCard } from './RadioCard';

interface MoodSelectorProps {
  mood: string;
  setMood: SetState<string>;
}

export const MoodSelector = ({ mood, setMood }: MoodSelectorProps) => {
  const router = useRouter();
  const { getRootProps, getRadioProps } = useRadioGroup({ name: 'mood' });

  const moodOptions = [
    '😖 Very Bad',
    '😫 Bad',
    '😐 Normal',
    '🙂 Nice',
    '🤩 Woop woop',
  ];
  const group = getRootProps();

  return (
    <>
      <Button
        leftIcon={<FaArrowLeft />}
        onClick={() => router.push('/new')}
        mb='5'
      >
        Back
      </Button>
      <Heading mb='5' size='lg' textAlign='center'>
        How was your mood throughout the day?
      </Heading>
      <RadioGroup name='mood'>
        <Stack {...group}>
          {moodOptions.map(value => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard
                key={value}
                {...radio}
                isChecked={value === mood}
                onChange={e => setMood(e.target.value)}
              >
                {value}
              </RadioCard>
            );
          })}
        </Stack>
      </RadioGroup>
    </>
  );
};
