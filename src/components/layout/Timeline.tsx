import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

export default ({ children }: Props): React.ReactElement => {
  return (
    <>
      <div className="timeline">
        {children}
      </div>
      <style jsx>{`
        .timeline {
          border: 2px solid #444;
          border-width: 0 2px;
          height: 100%;
          left: 24rem;
          max-height: 100%;
          overflow-y: auto;
          position: absolute;
          align-items: center;
          top: 0;
          width: 44rem;
        }
      `}</style>
    </>
  );
};
