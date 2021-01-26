const fs = require('fs');
const PATH = `${__dirname}/data.json`;

class Post {
  readData() {
    console.log(PATH);
    let rawdata = fs.readFileSync(PATH);
    let posts = JSON.parse(rawdata);
    return posts;
  }

  saveData(rawdata) {
    let post = JSON.stringify(rawdata);
    fs.writeFileSync(PATH, post);
  }
}

module.exports = Post;
