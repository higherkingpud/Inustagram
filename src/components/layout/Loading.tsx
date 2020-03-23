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
    </>
  );
};
