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
      <div className="dog-card shadow">
        <img
          className="dog-icon"
          src={iconUrl}
          alt={name}
        />
        <h2 className="dog-name">{name}</h2>
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
      `}</style>
    </>
  );
};
