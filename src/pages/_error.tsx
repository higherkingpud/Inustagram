import * as React from 'react';
import Head from 'next/head';

type Props = {
  statusCode: number;
};

export default ({
  statusCode = 400,
}: Props): React.ReactElement => {
  return (
    <>
      <Head><title>{statusCode}</title></Head>
      <div className="ststus-code"></div>
      <style jsx>{`
        .status-code {
          font-size: 40px;
        }
      `}</style>
    </>  
  );
};
