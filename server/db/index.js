const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapterTimeouts = new FileSync(path.join(__dirname, './timeouts.json'));
const timeouts = lowdb(adapterTimeouts);

const adapterPosts = new FileSync(path.join(__dirname, './posts.json'));
const posts = lowdb(adapterPosts);

module.exports = {
  timeouts,
  posts,
};
