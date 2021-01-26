const API_URL = 'http://localhost:4000/api/posts/';

const API_BASE_URL = 'http://localhost:4000/';

window.onload = () => {
  getPost();
};

const getPostIdParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
};

const getPost = () => {
  const postId = getPostIdParam();
  const URL = `${API_URL}${postId}`;
  console.log(URL);
  fetch(URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => buildPost(data));
};

const buildPost = (post) => {
  const postDate = new Date(parseInt(post.added_date)).toDateString();
  const postImage = `${API_BASE_URL}${post.post_image}`;
  document.querySelector('header').style.backgroundImage = `url(${postImage})`;
  const postContent = `
        <div id="individual-post-title">${post.title}</div>
                <div id="individual-post-date">Published on ${postDate}</div>
                <div id="individual-post-content">
                    ${post.content}
                </div>
 `;
  document.querySelector('.post-container').innerHTML = postContent;
};
