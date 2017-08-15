import { SET_COMMENT_SORT_ORDER } from '../actions';

import {
  sortVoteAscending,
  sortVoteDecending,
  sortTimestampAscending,
  sortTimeStampDecending,
  sortOrderInitialState,
  sortOrderStringToFunc,
} from '../utils/shared';

export default function categories(state = sortOrderInitialState, action) {
  console.log('cso ' + action.type);
  console.log('cso ' + action.sortOrder);
  console.log('cso commentSortOrder :' + action.sortOrder);
  console.log('cso typeof(commentSortOrder): ' + typeof action.sortOrder);

  switch (action.type) {
    case SET_COMMENT_SORT_ORDER:
      return {
        str: action.sortOrder,
        func: sortOrderStringToFunc(action.sortOrder),
      };
    default:
      return state;
  }
}
