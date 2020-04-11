const utils = require('../utils');
const { getPathRelativeToMocks, requireFromDisk } = utils;

function returnResponseJsonDynamically({ req, res, apiName }) {
  const mockConfigs = requireFromDisk(
    getPathRelativeToMocks('mockConfigs.json')
  );
  const apiConfigs = mockConfigs.apis[apiName];

  const mockDataFilePathFromHeader = req.header(
    mockConfigs.customHeaderFilePath
  );
  const fileToHandleApi = requireFromDisk(
    getPathRelativeToMocks(mockDataFilePathFromHeader || apiConfigs.filePath)
  );

  const mockDataResponseNameFromHeader = req.header(
    mockConfigs.customHeaderName
  );
  const resName =
    mockDataResponseNameFromHeader || apiConfigs.responseName || 'ok';
  const resBody = fileToHandleApi[resName].actualData({ req, utils });

  setTimeout(() => {
    res.json(resBody);
  }, apiConfigs.timeout || 200);
}

function getApiHandler(apiName) {
  return (req, res, next) => {
    if (useMockData(req)) {
      returnResponseJsonDynamically({
        req,
        res,
        apiName,
      });
      return;
    }
    next();
  };
}

function useMockData(req) {
  return req.cookies.mock_server === 'true';
}

module.exports = {
  getApiHandler,
};
