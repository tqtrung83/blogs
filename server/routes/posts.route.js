const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
} = require('../controllers/post.controller');

router.route('/').get(getAllPosts).post(createPost);
router.route('/:postId').get(getPost);

module.exports = router;
