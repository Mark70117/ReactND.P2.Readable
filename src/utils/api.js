const api = 'http://192.168.0.201:5001'; // FIX  -- need to get from env

const headers = {
  Accept: 'application/json',
  Authorization: '1018', // My birthday
  'Content-Type': 'application/json',
};

// GET /categories
// USAGE:
// Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
export const getCategories = () =>
  fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => {
    return { categories: data.categories };
  });

// GET /:category/posts
// USAGE:
// Get all of the posts for a particular category
export const getCategoryPosts = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });

// GET /posts
// USAGE:
// Get all of the posts. Useful for the main page when no category is selected.
export const getPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json()).then(data => {
    return data;
  });

// POST /posts
// USAGE:
// Add a new post

// PARAMS:
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// owner - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
export const postPosts = post => {
  return fetch(`${api}/posts/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(post),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

// GET /posts/:id
// USAGE:
// Get the details of a single post
export const getPostsId = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });

// POST /posts/:id
// USAGE:
// Used for voting on a post

// PARAMS:
// option - String: Either "upVote" or "downVote"
export const postPostsId = (postId, voteDirection) => {
  return fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: voteDirection }),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

// PUT /posts/:id
// USAGE:
// Edit the details of an existing post

// PARAMS:
// title - String
// body - String
export const putPostsId = post => {
  const datain = {};
  datain['timestamp'] = post.timestamp;
  datain['title'] = post.title;
  datain['body'] = post.body;

  return fetch(`${api}/posts/${post.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(datain),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

// DELETE /posts/:id
// USAGE:
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.
export const deletePostsId = id => {
  fetch(`${api}/posts/${id}`, { headers, method: 'DELETE' }).then(data => {
    return data;
  });
};

// GET /posts/:id/comments
// USAGE:
// Get all the comments for a single post
export const getPostsIdComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });

// POST /comments
// USAGE:
// Add a comment to a post

// PARAMS:
// id: Any unique ID. As with posts, UUID is probably the best here.
// timestamp: timestamp. Get this however you want.
// body: String
// owner: String
// parentId: Should match a post id in the database.
export const postComments = comment => {
  return fetch(`${api}/comments/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(comment),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

// GET /comments/:id
// USAGE:
// Get the details for a single comment
export const getCommentsId = id =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => {
      return data;
    });

// POST /comments/:id
// USAGE:
// Used for voting on a comment
export const postCommentsId = (commentId, voteDirection) => {
  return fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: voteDirection }),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

// PUT /comments/:id
// USAGE:
// Edit the details of an existing comment

// PARAMS:
// timestamp: timestamp. Get this however you want.
// body: String
export const putCommentsId = comment => {
  const datain = {};
  datain['timestamp'] = comment.timestamp;
  datain['body'] = comment.body;

  return fetch(`${api}/comments/${comment.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(datain),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

// DELETE /comments/:id
// USAGE:
// Sets a comment's deleted flag to 'true'
export const deleteCommentsId = id => {
  fetch(`${api}/comments/${id}`, { headers, method: 'DELETE' }).then(data => {
    return data;
  });
};
