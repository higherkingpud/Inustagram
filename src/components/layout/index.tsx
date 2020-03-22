import * as React from 'react';
import Head from 'next/head';
import HomeIcon from '@material-ui/icons/Home';

import SideMenu, { NavLink } from './SideMenu';

export default (): React.ReactElement => {
  return (
    <>
      <Head><title>Inustagram</title></Head>
      <SideMenu>
        <NavLink
          href="/"
          title="ホーム"
          Icon={HomeIcon}
        />
      </SideMenu>
    </>
  );
};
