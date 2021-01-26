const API_URL = 'http://localhost:4000/api/posts';

submitNewPost = () => {
  const input = document.getElementById('form-post-image');
  const title = document.getElementById('form-post-title').value;
  const content = document.getElementById('form-post-content').value;
  let data = new FormData();
  data.append('post-image', input.files[0]);
  data.append('title', title);
  data.append('content', content);

  console.log(data);
  fetch(API_URL, {
    method: 'POST',
    body: data,
  }).then(() => {
    window.location.href = 'index.html';
  });
};
