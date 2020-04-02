import * as React from 'react';

type Props = {
  query: string;
  children: React.ReactNode;
};

const match = (query: string): boolean => {
  if (typeof window === 'undefined') { return false; }
  return window.matchMedia(query).matches;
};

export default ({
  query,
  children,
}: Props): React.ReactElement => {
  const [isMatched, setMatched] = React.useState(match(query));

  React.useEffect(() => {
    const onResize = (): void => {
      setMatched(match(query));
    };
    window.addEventListener('onload', onResize);
    window.addEventListener('resize', onResize);
    return (): void => {
      window.addEventListener('onload', onResize);
      window.removeEventListener('resize', onResize);
    };
  }, [query]);

  return <>{isMatched && children}</>;
};
