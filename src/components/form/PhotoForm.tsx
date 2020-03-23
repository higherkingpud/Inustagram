import * as React from 'react';

import DogSelector from './DogSelector';
import ImageUploader from './ImageUploader';
import InputText from './InputText';
import usePhotoCreation from '../../hooks/usePhotoCreation';

export default (): React.ReactElement => {
  const hook = usePhotoCreation();
  return (
    <>
      <DogSelector
        dogs={hook.dogs}
        selectedDogId={hook.dogId}
        onChange={hook.onChangeDogId}
      />
      <InputText
        value={hook.title}
        onChange={hook.onChangeTitle}
        label="タイトルを入力してください"
      />
      <ImageUploader
        image={hook.image}
        onChange={hook.onChangeImage}
      />
      <div className="btn-submit">
        追加
      </div>
      <style jsx>{`
        .btn-submit {
          bottom: 0;
          border-radius: 1rem;
          background-color:  #61cdd5;
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
