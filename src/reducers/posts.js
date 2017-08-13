import { SYNC_POSTS, EDIT_POST, ADD_POST } from '../actions';
const initialState = [];

const makeIdKeyZulu = (total, element) => {
  if (element.id) {
    const existingTimestamp = total[element.id]
      ? total[element.id].timestamp
      : -1;

    if (element.timestamp > existingTimestamp) {
      return { ...total, [element.id]: element };
    } else {
      return total;
    }
  } else {
    return total;
  }
};

const sync = (prevPostDict, postArr) => {
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
