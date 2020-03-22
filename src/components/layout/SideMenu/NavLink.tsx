import * as React from 'react';
import { useRouter } from 'next/router';

type NavLinkProps = {
  Icon: React.FC;
  href: string;
  title: string;
};

export default ({
  href,
  title,
  Icon,
}: NavLinkProps): React.ReactElement => {
  const router = useRouter();
  const onClick = React.useCallback(() => {
    router.push(href);
  }, [href, router]);
  return (
    <>
      <a className="side-menu-link" onClick={onClick}>
        <div className="side-menu-row">
          <Icon />
          <div className="side-menu-link-title">
            <span>{title}</span>
          </div>
        </div>
      </a>
      <style jsx>{`
        .side-menu-row {
          display: flex;
          width: fit-content;
          padding: 0 .7rem;
          :global(.MuiSvgIcon-root) {
            font-size: 36px;
          }
          :hover {
            background-color: rgba(97, 205, 213, 0.5);
            border-radius: 18px;
          }
        }
        .side-menu-link-title {
          margin-left: 8px;
          font-size: 24px;
        }
      `}</style>
    </>
  );
};
