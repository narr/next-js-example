const path = require('path');

function getRootPath() {
  return path.join(__dirname, '../..');
}

function getPathRelativeToRoot(targetPath) {
  return path.join(getRootPath(), targetPath);
}

function getAssetsPath() {
  return path.join(getRootPath(), 'assets');
}

function getPathRelativeToAssets(targetPath) {
  return path.join(getAssetsPath(), targetPath);
}

function getMocksPath() {
  return path.join(getAssetsPath(), 'mocks');
}

function getPathRelativeToMocks(targetPath) {
  return path.join(getMocksPath(), targetPath);
}

function requireFromDisk(absolutePathWithExtension) {
  delete require.cache[absolutePathWithExtension];
  return require(absolutePathWithExtension);
}

function setGlobalVariable(key, value) {
  if (!global.MY_CUSTOM) {
    global.MY_CUSTOM = {};
  }
  global.MY_CUSTOM[key] = value;
}

function getGlobalVariable(key) {
  if (!global.MY_CUSTOM) {
    return;
  }
  return global.MY_CUSTOM[key];
}

module.exports = {
  getPathRelativeToRoot,
  getPathRelativeToAssets,
  getPathRelativeToMocks,
  requireFromDisk,
  setGlobalVariable,
  getGlobalVariable,
};
