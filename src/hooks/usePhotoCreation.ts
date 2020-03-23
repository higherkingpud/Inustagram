import {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';

import { Dog } from '../types';

type Context = {
  dogs: Dog[];
  userId: number;
};

export const PhotoCreationContext = createContext<Context>({
  dogs: [] as Dog[],
  userId: 1 as number,
});

type State = {
  dogId: number;
  image?: File;
  title: string;
};

type Handlers = {
  onChangeDogId: (value: number) => void;
  onChangeImage: (file: File) => void;
  onChangeTitle: (value: string) => void;
};

export default (): State & Handlers & Context => {
  const { dogs, userId } = useContext(PhotoCreationContext);
  const [state, setState] = useState<State>({
    dogId: 1,
    image: undefined,
    title: '',
  });
  const handlers: Handlers = {
    onChangeDogId: useCallback((dogId: number) => {
      setState(prev => ({ ...prev, dogId }));
    }, [setState]),
    onChangeImage: useCallback((image: File) => {
      setState(prev => ({ ...prev, image }));
    }, [setState]),
    onChangeTitle: useCallback((title: string) => {
      setState(prev => ({ ...prev, title }));
    }, [setState]),
  };
  return { ...state, ...handlers, dogs, userId };
};
