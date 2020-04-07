import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import getAbsoluteUrl from '../utils/getAbsoluteUrl';

import { User } from '../types';

export const redirect = (res: NextPageContext['res']): void => {
  if (res) {
    res.writeHead(302, { Location: '/signin' });
    res.end();
  }
};

export default async (ctx: NextPageContext): Promise<User> => {
  const baseUrl = getAbsoluteUrl(ctx.req);
  const { token } = parseCookies(ctx);
  const res = await fetch(`${baseUrl}/auth?token=${token}`);
  if (res.status !== 200) { redirect(ctx.res); }
  return await res.json() as User;
};
