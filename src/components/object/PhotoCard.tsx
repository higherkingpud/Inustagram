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
          padding: 2rem;
          height: fit-content;
          border-bottom: 2px solid #444 !important;
        }
        h3.photo-title {
          margin-top: 0;
          margin-bottom: 4px;
        }
        img {
          border-radius: 1rem;
          object-fit: cover;
          width: 100%;
          max-height: 24rem;
        }
        @media (max-width: 479px) {
          img {
            max-height: 12rem;
          }
        }
      `}</style>
    </>
  );
};
