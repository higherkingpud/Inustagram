import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout';
import PhotoCard from '../components/layout/PhotoCard';
import Timeline from '../components/layout/Timeline';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';
import { Photo, Dog } from '../types';
import { PhotoCreationContext } from '../hooks/usePhotoCreation';

type Props = {
  photos: Photo[];
  dogs: Dog[];
};

const Index: NextPage<Props> = ({
  photos,
  dogs,
}: Props) => {
  return (
    <PhotoCreationContext.Provider value={{ dogs, userId: 1 }}>
      <Layout />
      <Timeline>
        {photos.map(p => <PhotoCard {...p} key={p.pid} />)}
      </Timeline>
    </PhotoCreationContext.Provider>
  );
};

Index.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  const baseUrl = getAbsoluteUrl(req);
  const res = await fetch(`${baseUrl}/api/photos`);
  const photos = await res.json() as Photo[];
  const dogsRes = await fetch(`${baseUrl}/api/dogs`);
  const dogs = await dogsRes.json();
  return { photos, dogs };
};

export default Index;
