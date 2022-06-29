import { Input } from '@chakra-ui/react';
import { KeyboardEventHandler, useState } from 'react';

interface Props {
  addTag: (text: string) => void;
}

export const TagsInput = ({ addTag }: Props) => {
  const [tagInput, setTagInput] = useState('');

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (tagInput.trim() === '') return;
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
      setTagInput('');
    }
  };

  return (
    <>
      <Input
        value={tagInput}
        onChange={e => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        focusBorderColor='whatsapp.200'
        placeholder='Enter tags here'
      />
    </>
  );
};
