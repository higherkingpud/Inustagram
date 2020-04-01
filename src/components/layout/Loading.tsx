import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  message?: string;
};

export default ({ message }: Props): React.ReactElement => {
  return (
    <>
      <div className="overlay" />
      <div className="loading-message">
        <CircularProgress />
        {message}
      </div>
      <style jsx>{`
        .loading-message {
          position: fixed;
          z-index: 400;
          top: calc(50vh - 2rem);
          left: calc(50vw - 2rem);
        }
      `}</style>
    </>
  );
};
