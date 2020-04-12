import * as React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'reinspect';

import Button from '../components/form/Button';
import InputText from '../components/form/InputText';
import Modal from '../components/layout/Modal';

type State = {
  error?: string;
  isSubmitting: boolean;
  isSucceed: boolean;
  name: string;
  password: string;
};

const postSignin = async ({ name, password }: State): Promise<void> => {
  const res = await fetch('/api/signin', {
    method: 'POST',
    body: JSON.stringify({ cuName: name, cuPassword: password })
  }).catch(() => { throw new Error('Network error'); });
  if (res.status !== 200) { throw new Error(await res.text()); }
  const { token } = await res.json() as { token: string };
  setCookie({}, 'token', token, {
    maxAge: 24 * 60 * 60,
    path: '/'
  });
  return;
};

export default (): React.ReactElement => {
  const router = useRouter();
  const [state, setState] = useState<State>({
    error: undefined,
    isSubmitting: false,
    isSucceed: false,
    name: '',
    password: '',
  }, 'signin');
  React.useEffect(() => {
    const onSucceed = (): void => {
      setState(s => ({ ...s, isSucceed: true, isSubmitting: false }));
      setTimeout(() => { router.push('/'); }, 1500);
    };
    const onFailure = (error: Error): void => {
      setState(s => ({ ...s, isSubmitting: false, error: error.message }));
    };
    if(state.isSubmitting) {
      postSignin(state).then(onSucceed).catch(onFailure);
    }
  }, [state, router]);
  const onChangePassword = React.useCallback((password: string) => {
    setState(s => ({ ...s, password }));
  }, [setState]);
  const onChangeName = React.useCallback((name: string) => {
    setState(s => ({ ...s, name }));
  }, [setState]);
  const onSubmit = React.useCallback(() => {
    setState(s => ({ ...s, isSubmitting: true }));
  }, [setState]);
  return (
    <>
      <Modal title="ログイン" isActive>
        <div className="form-name">
          <InputText
            label="アカウントid"
            value={state.name}
            onChange={onChangeName}
          />
        </div>
        <div className="form-password">
          <InputText
            type="password"
            label="パスワード"
            value={state.password}
            onChange={onChangePassword}
          />
        </div>
        <Link href="/signup">
          <a>アカウント登録</a>
        </Link>
        <Button onClick={onSubmit} label="ログイン"/>
      </Modal>
      <style jsx>{`
        :global(h2) {
          text-align: center;
          margin-top: 1rem !important;
        }
        .form-name,
        .form-password {
          text-align: center;
          height: 4rem;
          :global(input) {
            padding-left: 1rem;
          }
        }
        @media(min-width: 480px) {
          .form-name {
            margin-top: 2rem;
          }
        }
        @media(max-width: 479px) {
          :global(.btn-row, .form-password) {
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  );
};
