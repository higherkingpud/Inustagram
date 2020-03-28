import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import InputText from '../form/InputText';
import ImageUploader from '../form/ImageUploader';
import useDogPersistance from '../../hooks/useDogPersistance';
import { Dog } from '../../types';

type Props = {
  dog?: Dog;
  onCancel: () => void;
};

export default ({
  dog,
  onCancel,
}: Props): React.ReactElement => {
  const [state, { onChangeBio, ...handlers }] = useDogPersistance(dog);
  const onChangeBioTextarea = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
      onChangeBio(event.currentTarget.value);
    }, [onChangeBio]);
  return (
    <>
      <div className="overlay" />
      <div className="dog-form shadow">
        <div
          className="btn-cancel"
          onClick={onCancel}>
          <CloseIcon />
        </div>
        <ImageUploader
          defaultSrc={state.iconUrl}
          image={state.image}
          onChange={handlers.onChangeImage}
        />
        <div className="dog-form-description">
          <div className="form-row flex">
            <h3>名前</h3>
            <InputText
              className="dog-form-input"
              onChange={handlers.onChangeName}
              value={state.name}
            />
          </div>
          <div className="form-row flex">
            <h3>犬種</h3>
            <InputText
              className="dog-form-input"
              onChange={handlers.onChangeBread}
              value={state.bread}
            />
          </div>
        </div>
        <textarea
          className="dog-bio"
          onChange={onChangeBioTextarea}
          placeholder="どんな犬？"
          value={state.bio}
        />
        <div
          className="btn-submit"
          onClick={handlers.onSubmit}>
          {state.isEdit ? '反映' : '追加'}
        </div>
      </div>
      <style jsx>{`
        .dog-form {
          background-color: #eee;
          border-radius: 1rem;
          height: 48rem;
          left: calc((100vw - 24rem) / 2);
          margin: 1rem 2rem;
          min-width: 24rem;
          padding: 2rem 3rem;
          position: fixed;
          top: 2rem;
          width: 32rem;
          z-index: 200;
        }
        .dog-form :global(img) {
          border-radius: 10rem;
          height: 20rem;
          margin-bottom: 0;
          min-height: 20rem;
          object-fit: cover;
          width: 20rem;
          border: 3px solid #444;
          h3 {
          }
        }
        :global(input.dog-form-input) {
          margin: 10px 0;
          text-align: center;
          width: 236px;
          background-color: #eee;
        }
        .form-row h3 {
          margin: 12px 0;
          margin-right: 24px;
        }
        .dog-form-description {
          margin: 1rem 2rem;
        }
        .dog-bio {
          font-size: 18px;
          border-radius: .5rem;
          border: 2px solid #444;
          display: block;
          margin-top: 1rem !important;
          min-height: 10rem;
          vertical-align: top;
          white-space: pre-wrap;
          width: 100%;
          padding: 4px;
        }
        .btn-cancel {
          cursor: pointer;
          fill: #444;
          height: 2rem;
          position: absolute;
          right: 1rem;
          text-align: center;
          top: 1rem;
          width: fit-content;
          :global(.MuiSvgIcon-root) {
            font-size: 2rem;
          }
        }
        .btn-submit {
          font-size: 14px;
          padding: 11px 40px;
          height: 2.8rem;
          width: fit-content;
          border-radius: 1.4rem;
          background-color: #61cdd5;
          margin: 1.6rem auto;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
