import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'reinspect';

import Button from '../components/form/Button';
import InputText from '../components/form/InputText';
import Modal from '../components/layout/Modal';

type CreateUserState = {
  cuName: string;
  cuPassword: string;
  passwordConfirm: string;
  isSubmitting: boolean;
  error?: string;
};

const postUser = async ({
  cuName,
  cuPassword,
}: CreateUserState): Promise<void> => {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ cuName, cuPassword })
  }).catch(() => { throw new Error('Network error'); });
  if (res.status !== 201) { throw new Error(await res.text()); }
  return;
};

export default (): React.ReactElement => {
  const router = useRouter();
  const [createUserState, setCreateUserState] = useState<CreateUserState>({
    cuName: '',
    cuPassword: '',
    passwordConfirm: '',
    isSubmitting: false,
  }, 'create-user');

  React.useEffect(() => {
    const onFailure = (e: Error): void => {
      setCreateUserState(state => ({
        ...state,
        error: e.message,
        isSubmitting: false
      }));
    };
    if (createUserState.isSubmitting) {
      postUser(createUserState)
        .then(() => router.push('/signin'))
        .catch(onFailure);
    }
  }, [createUserState, router]);

  const onChangeName = React.useCallback((cuName: string) => {
    setCreateUserState(state => ({ ...state, cuName }));
  }, [setCreateUserState]);
  const onChangePassword = React.useCallback((cuPassword: string) => {
    setCreateUserState(state => ({ ...state, cuPassword }));
  }, [setCreateUserState]);
  const onSubmit = React.useCallback(() => {
    setCreateUserState(state => ({ ...state, isSubmitting: true }));
  }, [setCreateUserState]);

  return (
    <>
      <Modal title="アカウント登録" isActive>
        <div className="form-name">
          <InputText
            label="アカウントid"
            value={createUserState.cuName}
            onChange={onChangeName}
          />
        </div>
        <div className="form-password">
          <InputText
            type="password"
            label="パスワード"
            value={createUserState.cuPassword}
            onChange={onChangePassword}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/signin">
            <a>ログイン画面へ</a>
          </Link>
        </div>
        <Button onClick={onSubmit} label="登録"/>
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
