import * as React from 'react';

import { Dog } from '../../../types';

export default ({
  bread,
  did,
  iconUrl,
  name,
}: Dog): React.ReactElement => {
  return (
    <>
      <div className="dog-card"></div>
      <style jsx>{`
        .dog-card {
          border: 2px solid #ccc;
          height: 40rem;
          min-width: 24rem;
        }
      `}</style>
    </>
  );
};
