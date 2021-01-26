const express = require('express');

const postRouter = require('./routes/posts.route');
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
const fileUpload = require('express-fileupload');

const app = express();

//Working with json
app.use(express.json());

//Set header for error with access controll

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

//File uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: helpers.imageFilter,
}).single('post-image');

app.use(upload);

//Make uploads folder to static

app.use('/uploads', express.static('uploads'));

//Router mount
app.use('/api/posts', postRouter);

// app.get('/', (req, res) => {
//   res.status(200).send('Hello world!');
// });

app.listen(4000, () => console.log('Listening on http://localhost:4000'));
