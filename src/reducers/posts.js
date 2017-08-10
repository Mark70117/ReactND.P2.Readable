import { SYNC_POSTS } from '../actions';
const initialState = [];

export default function posts(state = initialState, action) {
  console.log('pp ' + action.type);
  console.log('pp ' + action.posts);
  console.log('pp posts :' + JSON.stringify(action.posts, null, 4));
  switch (action.type) {
    case SYNC_POSTS:
      return action.posts; // FIX must be more smarter
    default:
      return state;
  }
}
