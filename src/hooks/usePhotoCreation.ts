import {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useState } from 'reinspect';
import fetch from 'isomorphic-unfetch';

import uploadFile from '../utils/uploadFile';
import { Dog } from '../types';

type Context = {
  dogs: Dog[];
  userId: number;
  refreshTimeline: () => void;
};

export const PhotoCreationContext = createContext<Context>({
  dogs: [] as Dog[],
  userId: 1 as number,
  refreshTimeline: () => {},
});

type State = {
  dogId: number;
  image?: File;
  title: string;
  isSubmitting: boolean;
};

type Handlers = {
  onChangeDogId: (value: number) => void;
  onChangeImage: (file: File) => void;
  onChangeTitle: (value: string) => void;
  onSubmit: () => void;
};

export default (): State & Handlers & Context => {
  const { dogs, userId, refreshTimeline } = useContext(PhotoCreationContext);
  const [state, setState] = useState<State>({
    dogId: 1,
    image: undefined,
    title: '',
    isSubmitting: false,
  }, 'photo-creation');
  useEffect(() => {
    const onSucceed = (): void => {
      setState(prev => ({ ...prev, isSubmitting: false }));
      refreshTimeline();
    };
    const postPhoto = async (): Promise<void> => {
      if (!state.image) { throw new Error('イメージが設定されていない'); }
      const url = await uploadFile(state.image);
      const res = await fetch('/api/photos', {
        method: 'POST',
        body: JSON.stringify({
          cpTitle: state.title,
          cpDogId: state.dogId,
          cpUserId: 1,
          cpUrl: url,
        })
      });
      if (res.status === 201) { return; }
      throw new Error(await res.text());
    };
    if (state.isSubmitting) {
      postPhoto().then(onSucceed).catch(e => {
        window.alert(e);
        onSucceed();
      });
    }
  }, [state, refreshTimeline]);
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
    onSubmit: useCallback(() => {
      setState(prev => ({ ...prev, isSubmitting: true }));
    }, [setState])
  };
  return { ...state, ...handlers, dogs, userId, refreshTimeline };
};
