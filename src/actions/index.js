export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SYNC_POSTS = 'SYNC_POSTS';
export const SYNC_COMMENTS = 'SYNC_COMMENTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'EDIT_POST';
export const SET_POST_SORT_ORDER = 'SET_POST_SORT_ORDER';
export const SET_COMMENT_SORT_ORDER = 'SET_COMMENT_SORT_ORDER';

export function syncCategories({ categories }) {
  console.log(
    'syncCategories categories :' + JSON.stringify(categories, null, 4)
  );

  return {
    type: SET_CATEGORIES,
    categories,
  };
}

export function syncPosts(posts) {
  console.log('syncPosts posts :' + JSON.stringify(posts, null, 4));

  return {
    type: SYNC_POSTS,
    posts,
  };
}

export function editPost(post) {
  console.log('editPost post :' + JSON.stringify(post, null, 4));

  return {
    type: EDIT_POST,
    post: {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
    },
  };
}

export function addPost(post) {
  console.log('editPost post :' + JSON.stringify(post, null, 4));

  return {
    type: EDIT_POST,
    post,
  };
}

export function setPostSortOrder(sortOrder) {
  console.log('setPostSortOrder sortOrder :' + sortOrder);

  return {
    type: SET_POST_SORT_ORDER,
    sortOrder,
  };
}

export function syncComments(comments) {
  console.log('syncComments comments :' + JSON.stringify(comments, null, 4));

  return {
    type: SYNC_COMMENTS,
    comments,
  };
}

export function setCommentSortOrder(sortOrder) {
  console.log('setCommentSortOrder sortOrder :' + sortOrder);

  return {
    type: SET_COMMENT_SORT_ORDER,
    sortOrder,
  };
}
