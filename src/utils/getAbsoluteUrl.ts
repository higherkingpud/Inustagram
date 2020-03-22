import { IncomingMessage } from 'http';

export default (req: IncomingMessage | undefined): string => {
  const host = req?.headers['x-forwarded-host']
    ?? req?.headers['host']
    ?? window?.location.host;  //eslint-disable-line
  const protocol = host.indexOf('localhost') > -1 ? 'http' : 'https';
  return `${protocol}://${host}`;
};
