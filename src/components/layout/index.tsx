import * as React from 'react';
import Head from 'next/head';
import HomeIcon from '@material-ui/icons/Home';

import Modal from './Modal';
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
        isActive={isModalActive}
        onClose={onCloseModal}>
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
