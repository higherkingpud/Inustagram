import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import CircularProgress from '@material-ui/core/CircularProgress';

import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout';
import PhotoCard from '../components/layout/PhotoCard';
import Timeline from '../components/layout/Timeline';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';
import useResource from '../hooks/useResource';
import { Photo, Dog } from '../types';
import { PhotoCreationContext } from '../hooks/usePhotoCreation';
import { Status } from '../utils/Resource';

type Props = {
  dogs: Dog[];
};

const Index: NextPage<Props> = ({
  dogs,
}: Props) => {
  const [photosR, refreshTimeline] = useResource<Photo[]>('/api/photos');
  return (
    <PhotoCreationContext.Provider value={{ dogs, userId: 1, refreshTimeline }}>
      <Layout />
      {photosR.status === Status.Loaded && (
        <Timeline>
          {photosR.value.map(p => <PhotoCard {...p} key={p.pid} />)}
        </Timeline>
      )}
      {photosR.status === Status.Loading && (<CircularProgress />)}
    </PhotoCreationContext.Provider>
  );
};

Index.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  const baseUrl = getAbsoluteUrl(req);
  const dogsRes = await fetch(`${baseUrl}/api/dogs`);
  const dogs = await dogsRes.json();
  return { dogs };
};

export default Index;
