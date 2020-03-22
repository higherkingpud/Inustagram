import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout';
import Timeline from '../components/layout/Timeline';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';
import { Photo } from '../types';
import PhotoCard from '../components/layout/PhotoCard';

type Props = {
  photos: Photo[];
};

const Index: NextPage<Props> = ({ photos }: Props) => {
  return (
    <>
      <Layout />
      <Timeline>
        {photos.map(p => <PhotoCard {...p} key={p.pid} />)}
      </Timeline>
    </>
  );
};

Index.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  const baseUrl = getAbsoluteUrl(req);
  const res = await fetch(`${baseUrl}/api/photos`);
  const photos = await res.json() as Photo[];
  return { photos };
};

export default Index;
