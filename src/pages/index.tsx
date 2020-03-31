import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import Timeline from '../components/layout/Timeline';
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

Index.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  const baseUrl = getAbsoluteUrl(req);
  const dogsRes = await fetch(`${baseUrl}/api/dogs`);
  const dogs = await dogsRes.json();
  return { dogs };
};

export default Index;
