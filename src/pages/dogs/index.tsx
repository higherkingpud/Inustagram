import * as React from 'react';
import Head from 'next/head';
import HomeIcon from '@material-ui/icons/Home';
import fetch from 'isomorphic-unfetch';
import getAbsoluteUrl from '../../utils/getAbsoluteUrl';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import DogCard from '../../components/object/DogCard';
import SideMenu, { NavLink, CreateButton } from '../../components/object/SideMenu';
import { Dog } from '../../types';

const onMouseWheel = (e: React.WheelEvent<HTMLDivElement>): void => {
  if (e.deltaX === 0) {
    e.stopPropagation();
    e.preventDefault();
    // noinspection JSSuspiciousNameCombination
    e.currentTarget.scrollBy(e.deltaY, 0);
  }
};

type Props = {
  dogs: Dog[];
};

const Dogs = ({ dogs }: Props): React.ReactElement => {
  const router = useRouter();
  return (
    <>
      <Head><title>Inustagram</title></Head>
      <h2>イッヌ</h2>
      <SideMenu>
        <NavLink
          href="/"
          title="ホーム"
          Icon={HomeIcon}
        />
        <CreateButton
          label="イッヌを追加"
          onClick={(): void => { router.push('/dogs/create'); }}
        />
      </SideMenu>
      <div
        id="dog-list-container"
        className="dog-list-container flex"
        onWheel={onMouseWheel}>
        {dogs.map(d => <DogCard key={d.did} {...d} />)}
      </div>
      <style jsx>{`
        h2 {
          text-align: center;
        }
        .dog-list-container {
          height: 40rem;
          width: calc(100% - 280px);
          float: right;
          overflow-x: auto;
        }
      `}</style>
    </>
  );
};


Dogs.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  const baseUrl = getAbsoluteUrl(req);
  const dogsRes = await fetch(`${baseUrl}/api/dogs`);
  const dogs = await dogsRes.json();
  return { dogs };
};

export default Dogs;
