import * as React from 'react';
import { useState } from 'reinspect';

import { Photo } from '../../types';

type Props = Photo & {
};

export default ({
  url,
  title,
}: Props): React.ReactElement => {
  const [isPreviewOpen, togglePreviewOpen] = useState(false, `preivew-${title}`);
  const onClickOverlay = React.useCallback(() => {
    togglePreviewOpen(false);
  }, [togglePreviewOpen]);
  return (
    <>
      {isPreviewOpen && (
        <>
          <div className="overlay" onClick={onClickOverlay}/>
          <img className="preview" src={url} onClick={onClickOverlay}/>
        </>
      )}
      <div className="photo-card">
        <h3 className="photo-title">{title}</h3>
        <img
          className="img-cutout"
          alt={title}
          onClick={(): void => { togglePreviewOpen(true); }}
          src={url}
        />
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
        .img-cutout {
          border-radius: 1rem;
          object-fit: cover;
          width: 100%;
          max-height: 24rem;
        }
        .overlay {
          z-index: 300;
        }
        .preview {
          top: 0;
          height: 100vh;
          margin: auto;
          object-fit: contain;
          position: fixed;
          width: 80vw;
          z-index: 400;
        }
        @media(min-width: 480px) {
          .preview {
            transform: translateX(-150px);
          }
        }
        @media (max-width: 479px) {
          .img-cutout {
            max-height: 12rem;
          }
          .preview {
            width: 100vw;
          }
        }
      `}</style>
    </>
  );
};
