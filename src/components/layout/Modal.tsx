import * as React from 'react';

type Props = {
  children: React.ReactNode;
  height?: string;
  isActive: boolean;
  onClose: () => void;
  title: string;
  width?: string;
};

export default ({
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
        <div className="modal">
          <h3>{title}</h3>
          {children}
          <div
            className="btn-modal-close"
            onClick={onClose}>
          close
          </div>
        </div>
      )}
      <style jsx>{`
        .modal {
          background-color: #fff;
          border-radius: 4px;
          border: 2px solid #444;
          box-shadow: 12px 6px 12px 2px rgba(0, 0, 0, .2), -12px 6px 12px 2px rgba(0, 0, 0, .2);
          top: 0;
          left: 0;
          margin: auto;
          min-height: ${height};
          padding: 8px 1rem;
          position: fixed;
          width: ${width};
          z-index: 200;
          top: 4rem;
          left: calc((100vw - ${width}) / 2);
        }
        h3 {
          margin: 0 0 8px 0;
        }
        .btn-modal-close {
          top: 1rem;
          border-radius: 1rem;
          background-color: #444;
          color: #fff;
          width: 7rem;
          height: 2rem;
          z-index: 1000;
          padding: 4px 2rem;
          text-align: center;
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
