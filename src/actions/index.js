export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SYNC_POSTS = 'SYNC_POSTS';

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
