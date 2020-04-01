import * as React from 'react';

type Props = {
  query: string;
  children: React.ReactNode;
};

const match = (query: string): boolean => {
  if (typeof window === 'undefined') { return true; }
  return window.matchMedia(query).matches;
};

export default ({
  query,
  children,
}: Props): React.ReactElement => {
  const [isMatched, setMatched] = React.useState(match(query));

  React.useEffect(() => {
    if (typeof window === 'undefined') { return; }
    const onResize = (): void => {
      setMatched(match(query));
    };
    window.addEventListener('resize', onResize);
    return (): void => { window.removeEventListener('resize', onResize); };
  }, [query]);

  return isMatched ? <>{children}</> : <></>;
};
