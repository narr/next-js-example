const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { timeouts } = require('../db');
const postCtrl = require('../controllers/post.ctrl');

function setProxy(app) {
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
    headers: {
      Cookie: '',
    },
    pathRewrite: {
      '^/api': '/',
    },
  });
  app.use(['/api'], proxyDelay, proxy);
}

module.exports = app => {
  app.use(cors());
  app.use(cookieParser());
  app.use(compression());
  app.use(morgan('dev'));

  app.use('/assets', express.static(path.join(__dirname, '../../assets')));

  // https://github.com/chimurai/http-proxy-middleware/issues/232
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/posts', (req, res, next) => {
    if (req.cookies.mock_server === 'true') {
      timeouts.read();
      const timeout = timeouts.get('getPosts') || 0;
      setTimeout(() => {
        postCtrl.getPosts(req, res);
      }, timeout);
      return;
    }
    next();
  });

  setProxy(app);
};
