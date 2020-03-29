import * as React from 'react';

import DogSelector from '../form/DogSelector';
import ImageUploader from '../form/ImageUploader';
import InputText from '../form/InputText';
import Loading from '../layout/Loading';
import usePhotoCreation from '../../hooks/usePhotoCreation';

export default (): React.ReactElement => {
  const hook = usePhotoCreation();
  return (
    <>
      {hook.isSubmitting && <Loading />}
      <DogSelector
        dogs={hook.dogs}
        selectedDogId={hook.dogId}
        onChange={hook.onChangeDogId}
      />
      <InputText
        value={hook.title}
        onChange={hook.onChangeTitle}
        label="タイトル"
      />
      <ImageUploader
        image={hook.image}
        onChange={hook.onChangeImage}
      />
      <div
        className="btn-submit"
        onClick={hook.onSubmit}>
        追加
      </div>
      <style jsx>{`
        .btn-submit {
          bottom: 0;
          border-radius: 1rem;
          background-color: #61cdd5;
          color: #444;
          width: 7rem;
          height: 2rem;
          z-index: 1000;
          padding: 4px 2rem;
          text-align: center;
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
