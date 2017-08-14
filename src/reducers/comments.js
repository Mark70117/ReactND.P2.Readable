import { SYNC_COMMENTS } from '../actions';
const initialState = {};

const makeIdKeyYankee = (total, element) => {
  //console.log('makeIdKeyZulu total' + JSON.stringify(total, null, 4));
  //console.log('makeIdKeyZulu element' + JSON.stringify(element, null, 4));

  if (element.id) {
    const existingTimestamp = total[element.id]
      ? total[element.id].timestamp
      : -1;
    const existingVoteScore = total[element.id]
      ? total[element.id].voteScore
      : 'NaN';

    if (element.timestamp > existingTimestamp) {
      console.log('makeIdKeyYankee change state existingTimeStamp');
      return { ...total, [element.id]: element };
    } else if (element.voteScore !== existingVoteScore) {
      console.log('makeIdKeyYankee change state existingVoteScore');
      return { ...total, [element.id]: element };
    } else {
      return total;
    }
  } else {
    return total;
  }
};

const sync = (prevCommentDict, commentArr) => {
  const commentDict = commentArr.reduce(makeIdKeyYankee, prevCommentDict);
  return commentDict;
};
export default function comments(state = initialState, action) {
  console.log('cc ' + action.type);
  switch (action.type) {
    case SYNC_COMMENTS:
      console.log(
        'cc comments SYNC_COMMENTS :' + JSON.stringify(action.comments, null, 4)
      );
      return sync(state, action.comments);
    // case ADD_POST:
    //   console.log(
    //     'pp ADD_POST action.post:' + JSON.stringify(action.post, null, 4)
    //   );
    //   return sync(state, [action.post]);
    // case EDIT_POST:
    //   console.log(
    //     'pp EDIT_POST action.post:' + JSON.stringify(action.post, null, 4)
    //   );
    //   const work = {
    //     ...state[action.post.id],
    //     timestamp: action.post.timestamp,
    //     title: action.post.title,
    //     body: action.post.body,
    //   };
    // console.log('pp EDIT_POST work:' + JSON.stringify(work, null, 4));
    // return sync(state, [work]);
    default:
      return state;
  }
}
