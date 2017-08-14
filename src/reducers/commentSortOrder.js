import { SET_COMMENT_SORT_ORDER } from '../actions';

const commentSortVoteAscending = (a, b) => a.voteScore > b.voteScore;
const commentSortVoteDecending = (a, b) => a.voteScore < b.voteScore;
const commentSortTimestampAscending = (a, b) => a.timestamp > b.timestamp;
const commentSortTimeStampDecending = (a, b) => a.timestamp < b.timestamp;

const initialState = {
  str: 'commentSortVoteDecending',
  func: commentSortVoteDecending,
};

const stringToFunc = sortOrderStr => {
  switch (sortOrderStr) {
    case 'commentSortVoteAscending':
      return commentSortVoteAscending;
    case 'commentSortVoteDecending':
      return commentSortVoteDecending;
    case 'commentSortTimestampAscending':
      return commentSortTimestampAscending;
    case 'commentSortTimeStampDecending':
      return commentSortTimeStampDecending;
    default:
      return commentSortVoteAscending;
  }
};

export default function categories(state = initialState, action) {
  console.log('cso ' + action.type);
  console.log('cso ' + action.sortOrder);
  console.log('cso commentSortOrder :' + action.sortOrder);
  console.log('cso typeof(commentSortOrder): ' + typeof action.sortOrder);

  switch (action.type) {
    case SET_COMMENT_SORT_ORDER:
      return { str: action.sortOrder, func: stringToFunc(action.sortOrder) };
    default:
      return state;
  }
}
