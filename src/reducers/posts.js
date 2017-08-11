import { SYNC_POSTS } from '../actions';
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
  console.log('pp ' + action.posts);
  console.log('pp posts :' + JSON.stringify(action.posts, null, 4));
  switch (action.type) {
    case SYNC_POSTS:
      return sync(state, action.posts);
    default:
      return state;
  }
}
