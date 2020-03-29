import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import { Dog } from '../../types';

type Props = Dog & {
  toEditMode: (did: number) => void;
};

export default ({
  bio,
  bread,
  did,
  toEditMode,
  iconUrl,
  name,
}: Props): React.ReactElement => {
  const onClickEditButton = React.useCallback(() => {
    toEditMode(did);
  }, [toEditMode, did]);
  return (
    <>
      <div className="dog-card shadow">
        <img
          className="dog-icon"
          src={iconUrl}
          alt={name}
        />
        <h2 className="dog-name" onClick={onClickEditButton}>
          {name}
          <EditIcon />
        </h2>
        <div className="description">
          <div className="dog-row flex">
            <div className="dog-row-title">犬種</div>
            <div className="dog-row-value">{bread}</div>
          </div>
          <text className="dog-bio">{bio}</text>
        </div>
      </div>
      <style jsx>{`
        .dog-card {
          background-color: #eee;
          border-radius: 1rem;
          height: 40rem;
          margin: 1rem 2rem;
          min-width: 24rem;
          padding: 2rem;
        }
        .dog-icon {
          border-radius: 10rem;
          height: 20rem;
          margin-bottom: 0;
          min-height: 20rem;
          object-fit: cover;
          width: 20rem;
          border: 3px solid #444;
        }
        .dog-name {
          text-align: center;
        }
        .description {
          margin: 1rem 0;
        }
        .dog-row {
          font-size: 24px;
        }
        .dog-row-title {
          font-weight: bold;
          margin: 0 1rem;
        }
        .dog-row-value {
          width: 12rem;
          text-align: center;
        }
        .dog-bio {
          display: block;
          margin-top: 1rem;
          vertical-align: top;
          white-space:pre-wrap;
        }
      `}</style>
    </>
  );
};
