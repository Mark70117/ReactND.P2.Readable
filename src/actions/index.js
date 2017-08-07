export const SET_CATEGORIES = 'SET_CATEGORIES';

export function syncCategories({ categories }) {
  console.log(
    'syncCategories categories :' + JSON.stringify(categories, null, 4)
  );

  return {
    type: SET_CATEGORIES,
    categories,
  };
}
