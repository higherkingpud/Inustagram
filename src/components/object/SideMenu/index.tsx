import * as React from 'react';
import PetsIcon from '@material-ui/icons/Pets';

export { default as CreateButton } from './CreateButton';
export { default as NavLink } from './NavLink';

type Props = {
  children: React.ReactNode;
};

export default ({ children }: Props): React.ReactElement => {
  return (
    <>
      <header role="banner" className="header">
        <div className="side-menu-container1">
          <div className="side-menu-container2">
            <div className="side-menu">
              <div className="side-menu-title">
                <PetsIcon />
              </div>
              <div className="side-menu-list">
                {React.Children.toArray(children)}
              </div>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        a {
          color: #333;
        }
        .header {
          -webkit-box-align: end;
          -webkit-box-flex: 1;
          align-items: flex-end;
          cursor: pointer;
          flex-grow: 1;
          z-index: 3;
        }
        .side-menu-container1 {
          backface-visibility: hidden;
          height: 100%;
          position: fixed;
          top: 0px;
        }
        .side-menu-container2 {
          -webkit-box-pack: justify;
          height: 100%;
          justify-content: space-between;
          margin-left: 4rem;
          overflow-y: auto;
          padding: 0 20px;
          width: 236px;
        }
        .side-menu {
          -webkit-box-align: start;
          align-items: flex-start;
          margin-top: 1rem;
        }
        .side-menu-title {
          max-width: 100%;
          padding: 2px .7rem;
          :global(.MuiSvgIcon-root) {
            font-size: 40px;
          }
        }
        .side-menu-list {
          margin-bottom: 5px;
          margin-top: 2px;
          width: 100%;
          nav {
            -webkit-box-align: start;
            -webkit-box-diraction: normal;
            -webkit-box-orient: vertical;
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
