import * as React from 'react';
import PetsIcon from '@material-ui/icons/Pets';
import { useState } from 'reinspect';
import HomeIcon from '@material-ui/icons/Home';

import DogIcon from '../../icon/DogIcon';
import SideMenu, { NavLink, CreateButton } from '../SideMenu';

type Props = {
  onClickCreateButton: () => void;
};

export default ({
  onClickCreateButton
}: Props): React.ReactElement => {
  const [isActive, toggleActive] = useState(false, 'header-menu');
  const sideMenuRef = React.useRef<HTMLDivElement>({} as HTMLDivElement);
  const onClickPetsIcon = React.useCallback(() => {
    toggleActive(true);
  }, [toggleActive]);
  const onClickCreateButton_ = React.useCallback(() => {
    toggleActive(false);
    onClickCreateButton();
  }, [onClickCreateButton]);

  React.useEffect(() => {
    const onClickBody = (event: MouseEvent): void => {
      if (isActive
        && sideMenuRef.current
        && sideMenuRef.current.contains(event.target as Node)){ return; }
      toggleActive(false);
    };
    document.body.addEventListener('click', onClickBody);
    return (): void => document.body.removeEventListener('click', onClickBody);
  }, [sideMenuRef, isActive]);

  return (
    <>
      {isActive && (<div className="overlay" />)}
      <header role="banner" className="header">
        <div className="header-menu">
          <PetsIcon onClick={onClickPetsIcon}/>
        </div>
        {isActive && (
          <SideMenu ref={sideMenuRef}>
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
              onClick={onClickCreateButton_}
            />
          </SideMenu>
        )}
      </header>
      <style jsx>{`
        .header-menu {
          background-color: #9d8770;
          border-bottom: 2px solid #444;
          display: flex;
          height: 2.8rem;
          opacity: 1;
          position: fixed;
          width: 100vw;
          z-index: 200;
          :global(.MuiSvgIcon-root) {
            margin: 8px;
          }
        }
      `}</style>
    </>
  );
};
