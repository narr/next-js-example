/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const next = require('next');
const setRoutes = require('./routes');
const server = express();

function start() {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

function nextSetup() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  app.prepare().then(() => {
    start();
  });
}

setRoutes(server);

if (process.env.NODE_ENV === 'build') {
  // pages
  server.use(/^(\/([a-z]+))+$/, (req, res) => {
    res.sendFile(path.join(__dirname, `../out${req.baseUrl}.html`));
  });
  server.use('/', express.static(path.join(__dirname, '../out')));
  start();
} else {
  nextSetup();
}
