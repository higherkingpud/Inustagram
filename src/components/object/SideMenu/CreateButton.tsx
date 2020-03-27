import * as React from 'react';

type Props = {
  label: string;
  onClick: () => void;
};

export default ({
  label,
  onClick,
}: Props): React.ReactElement => {
  return (
    <>
      <div className="create-button-row">
        <div className="button-create" onClick={onClick}>
          {label}
        </div>
      </div>
      <style jsx>{`
        .create-button-row {
          width: 100%;
          padding: 1rem;
        }
        .button-create {
          font-size: 14px;
          padding: 11px 40px;
          height: 2.8rem;
          width: fit-content;
          border-radius: 1.4rem;
          background-color: rgba(97, 205, 213, 0.5);
        }
      `}</style>
    </>
  );
};
