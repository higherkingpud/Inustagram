import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';

import getAbsoluteUrl from '../utils/getAbsoluteUrl';
import { Photo } from '../types';
import Layout from '../components/layout';

type Props = {
  photos: Photo[];
};

const Index: NextPage<Props> = () => {
  return (
    <Layout />
  );
};

Index.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  const baseUrl = getAbsoluteUrl(req);
  const res = await fetch(`${baseUrl}/api/photos`);
  const photos = await res.json() as Photo[];
  return { photos };
};

export default Index;
