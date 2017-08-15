import { SYNC_POSTS, EDIT_POST, ADD_POST } from '../actions';
const initialState = {};

const makeIdKeyZulu = (total, element) => {
  //console.log('makeIdKeyZulu total' + JSON.stringify(total, null, 4));
  //console.log('makeIdKeyZulu element' + JSON.stringify(element, null, 4));

  if (element.id) {
    // REFACTOR  util function
    const existingTimestamp = total[element.id]
      ? total[element.id].timestamp
      : -1;
    const existingVoteScore = total[element.id]
      ? total[element.id].voteScore
      : 'NaN';

    if (element.timestamp > existingTimestamp) {
      console.log('makeIdKeyZulu change state existingTimeStamp');
      return { ...total, [element.id]: element };
    } else if (element.voteScore !== existingVoteScore) {
      console.log('makeIdKeyZulu change state existingVoteScore');
      return { ...total, [element.id]: element };
    } else {
      return total;
    }
  } else {
    return total;
  }
};

const sync = (prevPostDict, postArr) => {
  // REFACTOR util function
  const postDict = postArr.reduce(makeIdKeyZulu, prevPostDict);
  return postDict;
};
export default function posts(state = initialState, action) {
  console.log('pp ' + action.type);
  switch (action.type) {
    case SYNC_POSTS:
      console.log(
        'pp posts SYNC_POSTS :' + JSON.stringify(action.posts, null, 4)
      );
      return sync(state, action.posts);
    case ADD_POST:
      console.log(
        'pp ADD_POST action.post:' + JSON.stringify(action.post, null, 4)
      );
      return sync(state, [action.post]);
    case EDIT_POST:
      console.log(
        'pp EDIT_POST action.post:' + JSON.stringify(action.post, null, 4)
      );
      const work = {
        ...state[action.post.id],
        timestamp: action.post.timestamp,
        title: action.post.title,
        body: action.post.body,
      };
      console.log('pp EDIT_POST work:' + JSON.stringify(work, null, 4));
      return sync(state, [work]);
    default:
      return state;
  }
}
