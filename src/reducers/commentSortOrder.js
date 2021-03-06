import { SET_COMMENT_SORT_ORDER } from '../actions';

import { sortOrderInitialState, sortOrderStringToFunc } from '../utils/shared';

export default function commentSortOrder(
  state = sortOrderInitialState,
  action
) {
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
