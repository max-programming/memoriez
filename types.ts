import { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface EntryType {
  ref?: { id: string };
  ts: number;
  id: string;
  data: {
    title: string;
    story: string;
    mood: string;
    date: string;
  };
}
