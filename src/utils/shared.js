import { getPostsIdComments } from '../utils/api';

export const getAppropriateComment = (postId, mergeComments) => {
  getPostsIdComments(postId).then(comments => {
    console.log(
      'CommentListContainer componentDidMount comments :' +
        JSON.stringify(comments, null, 4)
    );
    mergeComments(comments);
  });
};

const makeIdKey = (total, element) => {
  //console.log('makeIdKey total' + JSON.stringify(total, null, 4));
  //console.log('makeIdKey element' + JSON.stringify(element, null, 4));

  if (element.id) {
    const existingTimestamp = total[element.id]
      ? total[element.id].timestamp
      : -1;
    const existingVoteScore = total[element.id]
      ? total[element.id].voteScore
      : 'NaN';

    if (element.timestamp > existingTimestamp) {
      console.log('makeIdKey change state existingTimeStamp');
      return { ...total, [element.id]: element };
    } else if (element.voteScore !== existingVoteScore) {
      console.log('makeIdKey change state existingVoteScore');
      return { ...total, [element.id]: element };
    } else {
      return total;
    }
  } else {
    return total;
  }
};

export const sync = (prevPostDict, postArr) => {
  const postDict = postArr.reduce(makeIdKey, prevPostDict);
  return postDict;
};
