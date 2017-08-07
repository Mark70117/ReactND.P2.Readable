import { SET_CATEGORIES } from '../actions';
const initialState = [];

export default function categories(state = initialState, action) {
  console.log('zz ' + action.type);
  console.log('zz ' + action.categories);
  console.log('zzz categories :' + JSON.stringify(action.categories, null, 4));
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
