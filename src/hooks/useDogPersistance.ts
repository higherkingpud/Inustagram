import { useEffect, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import  { useState } from 'reinspect';

import uploadFile from '../utils/uploadFile';
import { Dog } from '../types';

type State = Omit<Dog, 'did' | 'iconUrl'> & {
  did?: number;
  iconUrl?: string;
  image?: File;
  isSubmitting: boolean;
  isEdit: boolean;
};

type Handlers = {
  onChangeBio: (value: State['bio']) => void;
  onChangeBread: (value: State['bread']) => void;
  onChangeImage: (image: File) => void;
  onChangeName: (value: State['name']) => void;
  onSubmit: () => void;
};

const postDog = async (uid: number, state: State): Promise<void> => {
  if (!state.image) { throw new Error('アイコンが設定されていません'); }
  const cdIconUrl = await uploadFile(state.image);
  const createDogRequest = {
    cdBio: state.bio,
    cdBread: state.bread,
    cdIconUrl,
    cdName: state.name,
    cdOwnerId: uid,
  };
  const res = await fetch('/api/dogs', {
    method: 'POST',
    body: JSON.stringify(createDogRequest),
  });
  if (res.status === 201) { return; }
  throw new Error(await res.text());
};

const patchDog = async (state: State): Promise<void> => {
  if (!state.did) { throw new Error('did is required but not foud.'); }
  if (!state.iconUrl) { throw new Error('iconUrl is required but not foud.'); }
  const iconUrl = state.image
    ? (await uploadFile(state.image))
    : state.iconUrl;
  const res = await fetch('/api/dogs', {
    method: 'PATCH',
    body: JSON.stringify({ ...state, iconUrl }),
  });
  if (res.status === 204) { return; }
  throw new Error(await res.text());
};

export default (uid: number, dog?: Dog): [State, Handlers] => {
  const router = useRouter();
  const [state, setState] = useState<State>({
    isSubmitting: false,
    image: undefined,
    isEdit: !!dog,
    name: '',
    bio: '',
    bread: '',
    ...dog,
  }, 'useDogPersistance');
  useEffect(() => {
    const onSucceed = (): void => {
      setState(prev => ({ ...prev, isSubmitting: false }));
      router.reload();
    };
    const onFailure = (e: Error): void => {
      window.alert(e.message);
      setState(prev => ({ ...prev, isSubmitting: false }));
    };
    if(state.isSubmitting) {
      state.isEdit
        ? patchDog(state).then(onSucceed).catch(onFailure)
        : postDog(uid, state).then(onSucceed).catch(onFailure);
    }
  }, [state, router, uid]);
  const handlers = {
    onChangeName: useCallback((name: string) => {
      setState(prev => ({ ...prev, name }));
    }, [setState]),
    onChangeBread: useCallback((bread: string) => {
      setState(prev => ({ ...prev, bread }));
    }, [setState]),
    onChangeImage: useCallback((image: File) => {
      setState(prev => ({ ...prev, image }));
    }, [setState]),
    onChangeBio: useCallback((bio: string) => {
      setState(prev => ({ ...prev, bio }));
    }, [setState]),
    onSubmit: useCallback(() => {
      setState(prev => ({ ...prev, isSubmitting: true }));
    }, [setState]),
  };
  return [state, handlers];
};
