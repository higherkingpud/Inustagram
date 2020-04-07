import Multer from 'multer';
import cookie from 'cookie';
import express from 'express';
import next from 'next';
import { Storage } from '@google-cloud/storage';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { format } from 'util';
import { parse } from 'url';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const DEFAULT_API_BASE_URL = 'http://34.85.87.212:3000';

const BUCKET_ID = 'inustagram-images';

const apiBaseUrl = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
// 色んな環境変数が必要だけど、Google Ap Engine で自動で設定されるらしい。
// Instantiate a storage client
const storage = new Storage();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 10mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket(BUCKET_ID);

(async (): Promise<void> => {
  await app.prepare();
  const server = express();
  server.use(createProxyMiddleware('/api/**', {
    target: apiBaseUrl,
    changeOrigin: true,
    pathRewrite: { '/api': '/' },
    onProxyReq: (proxyReq, req): void => {
      const cookie_ = req.headers.cookie;
      if (typeof cookie_ === 'string') {
        const tokenEscaped = cookie.parse(cookie_).token as string;
        const token = unescape(tokenEscaped);
        return proxyReq.setHeader('authorization', `Bearer ${token}`);
      }
    },
  }));

  server.use(express.json({ limit: '10mb' }));

  server.post('/storage', multer.single('file'), (req, res) => {
    if (!req.file) {
      res.status(400).send('Nofile upload');
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
      throw err;
    });

    blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
      const url = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(201).send(JSON.stringify({ url }));
    });

    blobStream.end(req.file.buffer);
  });

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  await server.listen(8080);
  console.log(`Ready on http://localhost:${8080}`); // eslint-disable-line no-console
})();
