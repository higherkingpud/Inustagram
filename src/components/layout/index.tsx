import * as React from 'react';
import Head from 'next/head';
import HomeIcon from '@material-ui/icons/Home';

import Modal from './Modal';
import PhotoForm from '../form/PhotoForm';
import SideMenu, { CreateButton, NavLink } from './SideMenu';

export default (): React.ReactElement => {
  const [isModalActive, setIsModalActive] = React.useState(false);
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
        <CreateButton
          label="写真を追加"
          onClick={onClickNewPhotoButton}
        />
      </SideMenu>
    </>
  );
};
