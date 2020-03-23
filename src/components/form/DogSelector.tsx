import * as React from 'react';

import { Dog } from '../../types';

type Props = {
  selectedDogId: number;
  dogs: Dog[];
  onChange: (id: number) => void;
};

export default ({
  selectedDogId,
  dogs,
  onChange,
}: Props): React.ReactElement => {
  return (
    <>
      <div className="dog-selector flex">
        {dogs.map(({ did, iconUrl }) => (
          <img
            src={iconUrl}
            key={did}
            onClick={(): void => onChange(did)}
            style={{ border: did === selectedDogId
              ? '2px solid #61cdd5'
              : '1px solid #444'
            }}
          />
        ))}
      </div>
      <style jsx>{`
        .dog-selector {
          height: 3rem;
          max-width: 100%;
          overflow-x: auto;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        img + img {
          margin-left: 8px;
        }
      `}</style>
    </>
  );
};

