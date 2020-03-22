import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { parse } from 'url';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const DEFAULT_API_BASE_URL = 'http://34.84.93.244:3000';

const apiBaseUrl = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;

(async (): Promise<void> => {
  await app.prepare();
  const server = express();
  server.use(createProxyMiddleware('/api/**', {
    target: apiBaseUrl,
    changeOrigin: true,
    pathRewrite: { '/api': '/' },
    // onProxyReq: (proxyReq, req): void => {
    // const cookie_ = req.headers.cookie;
    // if (typeof cookie_ === 'string') {
    // const tokenEscaped = cookie.parse(cookie_).token as string;
    // const token = unescape(tokenEscaped);
    // return proxyReq.setHeader('authorization', `Bearer ${token}`);
    // }
  }));

  server.use(express.json({ limit: '10mb' }));
  
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  await server.listen(8080);
  console.log(`Ready on http://localhost:${8080}`); // eslint-disable-line no-console
})();
