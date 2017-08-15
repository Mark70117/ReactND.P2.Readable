import { SET_POST_SORT_ORDER } from '../actions';
import {
  sortVoteAscending,
  sortVoteDecending,
  sortTimestampAscending,
  sortTimeStampDecending,
  sortOrderInitialState,
  sortOrderStringToFunc,
} from '../utils/shared';

export default function postSortOrder(state = sortOrderInitialState, action) {
  switch (action.type) {
    case SET_POST_SORT_ORDER:
      return {
        str: action.sortOrder,
        func: sortOrderStringToFunc(action.sortOrder),
      };
    default:
      return state;
  }
}
