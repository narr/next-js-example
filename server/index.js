/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const HttpsProxyAgent = require('https-proxy-agent');
const { getPathRelativeToAssets } = require('./utils');
const { getApiHandler } = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// NOTE: this needs to be true if localhost is behind a corporate server and
// make a request to an external URL (if it is an internal URL, it is not necessary)
const needProxyAgent = false;
const proxyServerUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const proxyAgent = needProxyAgent && new HttpsProxyAgent(proxyServerUrl);

app.prepare().then(() => {
  const server = express();
  server.use(morgan('dev'));
  server.use(cors());
  server.use(cookieParser());
  // Below seems likes no more issue with the latest version of express and
  // http-proxy-middleware
  // https://github.com/chimurai/http-proxy-middleware/issues/232
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use('/assets', express.static(getPathRelativeToAssets('')));
  server.use('/api/posts', getApiHandler('getAllPosts'));

  const proxyDelay = (req, res, next) => {
    if (req.originalUrl === '/api/posts') {
      // Delay request by 3 seconds
      setTimeout(next, 3000);

      // Delay response completion by 3 seconds
      const endOriginal = res.end;
      res.end = (...args) => {
        setTimeout(() => {
          endOriginal.apply(res, args);
        }, 3000);
      };
    } else {
      next();
    }
  };
  const proxy = createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    secure: false,
    agent: proxyAgent,
    headers: {
      Cookie: '',
    },
    pathRewrite: {
      '^/api': '/',
    },
  });
  server.use(['/api'], proxyDelay, proxy);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
