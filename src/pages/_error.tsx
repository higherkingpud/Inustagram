import * as React from 'react';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';

type Props = {
  statusCode?: number;
};

const ErrorPage: NextPage<Props> = ({
  statusCode = 400,
}: Props): React.ReactElement => {
  return (
    <>
      <Head><title>{statusCode}</title></Head>
      <div>
        <div className="status-code">{statusCode}</div>
      </div>
      <style jsx>{`
        .status-code {
          margin-top: 10rem;
          font-size: 20rem;
          text-align: center;
        }
      `}</style>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): Props => {
  return { statusCode: res?.statusCode ?? err?.statusCode };
};

export default ErrorPage;
