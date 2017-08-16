export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SYNC_POSTS = 'SYNC_POSTS';
export const SYNC_COMMENTS = 'SYNC_COMMENTS';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_POST_SORT_ORDER = 'SET_POST_SORT_ORDER';
export const SET_COMMENT_SORT_ORDER = 'SET_COMMENT_SORT_ORDER';

export function syncCategories({ categories }) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}

export function syncPosts(posts) {
  return {
    type: SYNC_POSTS,
    posts,
  };
}

export function editPost(post) {
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
  return {
    type: ADD_POST,
    post,
  };
}

export function setPostSortOrder(sortOrder) {
  return {
    type: SET_POST_SORT_ORDER,
    sortOrder,
  };
}

export function syncComments(comments) {
  return {
    type: SYNC_COMMENTS,
    comments,
  };
}

export function setCommentSortOrder(sortOrder) {
  return {
    type: SET_COMMENT_SORT_ORDER,
    sortOrder,
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment: {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
    },
  };
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}
