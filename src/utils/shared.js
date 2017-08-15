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
