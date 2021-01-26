const Post = require('../models/posts.model');
const multer = require('multer');
const path = require('path');
const postsData = new Post();
const helpers = require('../helpers');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// var multer = require('multer');
// var upload = multer({ dest: 'uploads/' });

// const upload = multer({
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(new multer.MulterError('not a PNG'));
//     }
//   },
//   dest: 'uploads/',
// }).single('post-image');

// @desc   Get all posts
// @router GET api/posts
// @access Public

module.exports.getAllPosts = (req, res) => {
  return res.status(200).send(postsData.readData());
};

// @desc   Get post
// @router GET api/posts/postId
// @access Public

module.exports.getPost = function (req, res) {
  const postId = req.params.postId;
  const posts = postsData.readData();
  const post = posts.find((item) => item.id === postId);
  if (!post) {
    return res.status(404).json({
      msg: `The post with id ${postId} does not exists`,
    });
  }
  return res.status(201).send(post);
};

// @desc   Create new post
// @router POST api/posts
// @access public

module.exports.createPost = function (req, res) {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  //   console.log(req.file);

  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    post_image: req.file.path,
    content: req.body.content,
    added_date: Date.now().toString(),
  };
  console.log(newPost);
  const currentPosts = postsData.readData();
  currentPosts.unshift(newPost);
  postsData.saveData(currentPosts);
  res.status(201).send(postsData.readData());
};

// @desc   Delete post
// @router DELETE api/posts/postId
// @access Public
module.exports.deletePost = function (req, res) {};
