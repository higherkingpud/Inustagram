import * as React from 'react';

import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  className?: string;
  children: React.ReactNode;
  height?: string;
  isActive: boolean;
  onClose: () => void;
  title: string;
  width?: string;
};

export default ({
  className,
  children,
  height = '20rem',
  isActive,
  onClose,
  title,
  width = '40rem',
}: Props): React.ReactElement => {
  return (
    <>
      {isActive && <div className="overlay" />}
      {isActive && (
        <div className={clsx('modal shadow', className)}>
          <CloseIcon
            className="btn-modal-close"
            onClick={onClose}
          />
          <h2>{title}</h2>
          {children}
        </div>
      )}
      <style jsx>{`
        .modal {
          background-color: #fff;
          border-radius: 4px;
          border: 2px solid #444;
          top: 0;
          left: 0;
          margin: auto;
          min-height: ${height};
          padding: 8px 1rem;
          position: fixed;
          z-index: 200;
          top: 4rem;
        }
        h2 {
          margin: 0 0 8px 0;
        }
        :global(.btn-modal-close) {
          top: 1rem;
          fill: #444;
          height: 2rem;
          z-index: 1000;
          text-align: center;
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          cursor: pointer;
        }
        @media(min-width: 480px) {
          .modal {
            width: ${width};
            left: calc((100vw - ${width}) / 2);
          }
        }
        @media(max-width: 479px) {
          .modal {
            left: 0;
            top: 0;
            width: 100%;
          }
          :global(.btn-modal-close) {
            top: 8px;
          }
        }
      `}</style>
    </>
  );
};
