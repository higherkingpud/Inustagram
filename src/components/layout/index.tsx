import * as React from 'react';
import Head from 'next/head';
import HomeIcon from '@material-ui/icons/Home';
import { useState } from 'reinspect';

import DogIcon from '../icon/DogIcon';
import Modal from './Modal';
import PhotoForm from '../object/PhotoForm';
import SideMenu, { CreateButton, NavLink } from '../object/SideMenu';

export default (): React.ReactElement => {
  const [isModalActive, setIsModalActive] = useState(false, 'photo-creation-modal');
  const onClickNewPhotoButton = React.useCallback(() => {
    setIsModalActive(true);
  }, [setIsModalActive]);
  const onCloseModal = React.useCallback(() => {
    setIsModalActive(false);
  }, [setIsModalActive]);
  return (
    <>
      <Head><title>Inustagram</title></Head>
      <Modal
        title="新しい写真"
        isActive={isModalActive}
        onClose={onCloseModal}>
        <PhotoForm />
      </Modal>
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
          label="写真を追加"
          onClick={onClickNewPhotoButton}
        />
      </SideMenu>
    </>
  );
};
