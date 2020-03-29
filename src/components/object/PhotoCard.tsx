import * as React from 'react';

import { Photo } from '../../types';

type Props = Photo & {
};

export default ({ 
  url,
  title,
}: Props): React.ReactElement => {
  return (
    <>
      <div className="photo-card">
        <h3 className="photo-title">{title}</h3>
        <img src={url} alt={title}/>
      </div>
      <style jsx>{`
        .photo-card {
          width: 100%;
          padding: 3px 2rem;
          height: fit-content;
        }
        img {
          border-radius: 1rem;
          width: 100%;
          max-height: 30rem;
        }
      `}</style>
    </>
  );
};
