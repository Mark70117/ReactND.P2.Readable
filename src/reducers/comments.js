import { ADD_COMMENT, EDIT_COMMENT, SYNC_COMMENTS } from '../actions';
import { sync } from '../utils/shared';

const initialState = {};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case SYNC_COMMENTS:
      return sync(state, action.comments);
    case ADD_COMMENT:
      return sync(state, [action.comment]);
    case EDIT_COMMENT:
      const work = {
        ...state[action.comment.id],
        timestamp: action.comment.timestamp,
        body: action.comment.body,
      };
      return sync(state, [work]);
    default:
      return state;
  }
}
