import { SYNC_POSTS, EDIT_POST, ADD_POST } from '../actions';
import { sync } from '../utils/shared';

const initialState = {};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case SYNC_POSTS:
      return sync(state, action.posts);
    case ADD_POST:
      return sync(state, [action.post]);
    case EDIT_POST:
      const work = {
        ...state[action.post.id],
        timestamp: action.post.timestamp,
        title: action.post.title,
        body: action.post.body,
      };
      return sync(state, [work]);
    default:
      return state;
  }
}
