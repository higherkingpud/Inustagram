import * as React from 'react';

import DogSelector from './DogSelector';
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
    </>
  );
};
