import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import Timeline from '../components/layout/Timeline';
import auth from '../utils/auth';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';
import { Dog } from '../types';
import { StateInspector } from 'reinspect';

type Props = {
  dogs: Dog[];
};


const Index: NextPage<Props> = ({
  dogs,
}: Props) => {
  return (
    <>
      <Head><title>Inustagram</title></Head>
      <StateInspector>
        <Timeline dogs={dogs} />
      </StateInspector>
    </>
  );
};

Index.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const user = await auth(ctx);
  const baseUrl = getAbsoluteUrl(ctx.req);
  const dogsRes = await fetch(`${baseUrl}/api/users/${user.uid}/dogs`);
  const dogs = await dogsRes.json();
  return { dogs };
};

export default Index;
