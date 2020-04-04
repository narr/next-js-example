/* eslint-disable no-console */

const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

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
    pathRewrite: {
      '^/api': '/',
    },
  });
  server.use('/api', proxyDelay, proxy);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
