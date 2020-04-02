import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeIcon from '@material-ui/icons/Home';
import { useState } from 'reinspect';

import DogIcon from '../icon/DogIcon';
import HeaderMenu from '../object/HeaderMenu';
import Modal from './Modal';
import PhotoCard from '../object/PhotoCard';
import PhotoForm from '../object/PhotoForm';
import SideMenu, { NavLink, CreateButton } from '../object/SideMenu';
import useResource from '../../hooks/useResource';
import { Photo, Dog } from '../../types';
import { PhotoCreationContext } from '../../hooks/usePhotoCreation';
import { Status } from '../../utils/Resource';

type Props = {
  dogs: Dog[];
};

const comparePhotoDesc = (b: Photo,a: Photo): 1 | 0 | -1 => {
  if (a.pid > b.pid) { return 1; }
  if (a.pid === b.pid) { return 0; }
  return -1;
};

const wheight = typeof window === 'undefined' ? '100vh' : `${window.innerHeight}px`;

export default ({ dogs }: Props): React.ReactElement => {
  const [photosR, refreshTimeline] = useResource<Photo[]>('/api/photos');
  const [isModalActive, setIsModalActive] = useState(false, 'photo-creation-modal');
  const onClickNewPhotoButton = React.useCallback(() => {
    setIsModalActive(true);
  }, [setIsModalActive]);
  const onCloseModal = React.useCallback(() => {
    setIsModalActive(false);
  }, [setIsModalActive]);
  return (
    <PhotoCreationContext.Provider value={{ dogs, userId: 1, refreshTimeline }}>
      <Modal
        title="新しい写真"
        isActive={isModalActive}
        onClose={onCloseModal}>
        <PhotoForm />
      </Modal>
      <SideMenu className="default-side-menu">
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
          label="写真を追加"
          onClick={onClickNewPhotoButton}
        />
      </SideMenu>
      <HeaderMenu
        createButtonLabel="写真を追加"
        onClickCreateButton={onClickNewPhotoButton}
      />
      <div className="timeline">
        {photosR.status === Status.Loading && (
          <CircularProgress />
        )}
        {photosR.status === Status.Loaded
          && photosR.value.sort(comparePhotoDesc).map(p =>
            <PhotoCard {...p} key={p.pid} />
          )
        }
      </div>
      <style jsx>{`
        .timeline {
          height: 100%;
          max-height: 100%;
          overflow-y: auto;
          position: absolute;
          align-items: center;
        }
        @media(max-width: 479px) {
          :global(.default-side-menu) {
            display: none;
          }
          .timeline {
            top: 2.8rem;
            left: 0;
            width: 100vw;
            height: ${wheight};
          }
        }
        @media(min-width: 480px) {
          .timeline {
            border-width: 0 2px;
            border: 2px solid #444;
            left: 24rem;
            width: 44rem;
          }
        }
      `}</style>
    </PhotoCreationContext.Provider>
  );
};
