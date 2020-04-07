import * as React from 'react';

type Props = {
  label: string;
  onClick: () => void;
  className?: string;
};

export default ({
  label,
  onClick,
}: Props): React.ReactElement => {
  return (
    <>
      <div className="btn-row">
        <div className="btn" onClick={onClick}>
          {label}
        </div>
      </div>
      <style jsx>{`
        .btn-row {
          text-align: center;
          justify-content: center;
          width: 100%;
          padding: 1rem;
        }
        .btn {
          font-size: 14px;
          padding: 11px 40px;
          height: 2.8rem;
          width: fit-content;
          border-radius: 1.4rem;
          background-color: rgba(97, 205, 213, 0.5);
          margin: auto;
        }
      `}</style>
    </>
  );
};
