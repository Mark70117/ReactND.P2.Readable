import { SET_POST_SORT_ORDER } from '../actions';

const postSortVoteAscending = (a, b) => a.voteScore > b.voteScore;
const postSortVoteDecending = (a, b) => a.voteScore < b.voteScore;
const postSortTimestampAscending = (a, b) => a.timestamp > b.timestamp;
const postSortTimeStampDecending = (a, b) => a.timestamp < b.timestamp;

const initialState = postSortVoteAscending;

const stringToFunc = sortOrderStr => {
  switch (sortOrderStr) {
    case 'postSortVoteAscending':
      return postSortVoteAscending;
    case 'postSortVoteDecending':
      return postSortVoteDecending;
    case 'postSortTimestampAscending':
      return postSortTimestampAscending;
    case 'postSortTimeStampDecending':
      return postSortTimeStampDecending;
    default:
      return postSortVoteAscending;
  }
};

export default function categories(state = initialState, action) {
  console.log('pso ' + action.type);
  console.log('pso ' + action.sortOrder);
  console.log('pso postSortOrder :' + action.sortOrder);
  console.log('pso typeof(postSortOrder): ' + typeof action.sortOrder);

  switch (action.type) {
    case SET_POST_SORT_ORDER:
      return stringToFunc(action.sortOrder);
    default:
      return state;
  }
}
