const { posts } = require('../db');

function getPosts(req, res) {
  posts.read();
  return res.status(200).json(posts.get('posts').value());
}

module.exports = {
  getPosts,
};
