import * as React from 'react';

type Props = {
  isActive: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export default ({
  children,
  isActive,
  onClose,
}: Props): React.ReactElement => {
  return (
    <>
      {isActive && <div className="overlay" />}
      {isActive && (
        <div className="modal">
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
          border-radius: 3px;
          border: 2px solid #444;
          box-shadow: 12px 6px 12px 2px rgba(0, 0, 0, .2), -12px 6px 12px 2px rgba(0, 0, 0, .2);
          top: 0;
          left: 0;
          margin: auto;
          min-height: 32rem;
          padding: 3px 1rem;
          position: fixed;
          width: 54rem;
          z-index: 200;
          top: 4rem;
          left: calc((100vw - 52rem) / 2)
        }
        .btn-modal-close {
          bottom: 0;
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
