import * as React from 'react';
import Head from 'next/head';
import HomeIcon from '@material-ui/icons/Home';
import fetch from 'isomorphic-unfetch';
import { StateInspector } from 'reinspect';
import { NextPageContext } from 'next';

import HeaderMenu from '../../components/object/HeaderMenu';
import DogCard from '../../components/object/DogCard';
import DogForm from '../../components/object/DogForm';
import DogIcon from '../../components/icon/DogIcon';
import Media from '../../components/layout/Media';
import SideMenu, { NavLink, CreateButton } from '../../components/object/SideMenu';
import getAbsoluteUrl from '../../utils/getAbsoluteUrl';
import { Dog } from '../../types';

const onMouseWheel = (e: React.WheelEvent<HTMLDivElement>): void => {
  if (e.deltaX === 0) {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.scrollBy(e.deltaY, 0);
  }
};

type Props = {
  dogs: Dog[];
};

const Dogs = ({ dogs }: Props): React.ReactElement => {
  const [dogToEdit, setDogToEdit] = React.useState<number | undefined>();
  const [isCreateDog, toggleCreateDog] = React.useState(false);
  return (
    <>
      <Head><title>Inustagram</title></Head>
      <StateInspector name="dogs">
        <Media query="(min-width: 480px)">
          <h1>犬小屋</h1>
          <SideMenu>
            <NavLink
              href="/"
              title="ホーム"
              Icon={HomeIcon}
            />
            <NavLink
              href="/dogs"
              title="犬小屋"
              Icon={DogIcon}
            />
            <CreateButton
              label="イッヌを追加"
              onClick={(): void => toggleCreateDog(true) }
            />
          </SideMenu>
        </Media>
        <Media query="(max-width: 479px)">
          <HeaderMenu
            createButtonLabel="犬を追加"
            onClickCreateButton={(): void => toggleCreateDog(true)}
          />
        </Media>
        {dogToEdit && (
          <DogForm
            onCancel={(): void => setDogToEdit(undefined)}
            dog={dogs.find(d => d.did === dogToEdit)}
          />
        )}
        {isCreateDog && <DogForm onCancel={(): void => toggleCreateDog(false)}/>}
        <div
          id="dog-list-container"
          className="dog-list-container flex"
          onWheel={onMouseWheel}>
          <div className="dog-list-inner flex">
            {dogs.map(d => (
              <DogCard
                {...d}
                key={d.did}
                toEditMode={setDogToEdit}
              />
            ))}
          </div>
        </div>
      </StateInspector>
      <style jsx>{`
        h1 {
          margin-top: 3rem;
          text-align: center;
        }
        .dog-list-container {
          overflow-x: auto;
        }
        .dog-list-inner {
          padding: 0 1rem;
        }
        @media(min-width: 480px) {
          .dog-list-container {
            height: 44rem;
            float: right;
            border-left: 2px solid #444;
            width: calc(100% - 300px);
          }
        }
        @media(max-width: 479px) {
          .dog-list-container {
            height: 100vh;
            max-width: 100vw;
            padding-top: 4rem;
          }
          .dog-list-inner {

          }
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
