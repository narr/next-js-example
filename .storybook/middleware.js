const setRoutes = require('../server/routes');

module.exports = function expressMiddleware(router) {
  setRoutes(router);
};
