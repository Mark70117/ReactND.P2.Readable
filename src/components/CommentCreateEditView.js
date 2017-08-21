import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'js-uuid';

import CommentFormEdit from './CommentFormEdit';
import CommentFormAdd from './CommentFormAdd';

import { syncComments, editComment, addComment, syncPosts } from '../actions';
import { getCommentsId, putCommentsId, postComments } from '../utils/api';
import { doGetPostsId } from '../utils/shared';

class CommentCreateEditView extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    changeComment: PropTypes.func.isRequired,
    commentId: PropTypes.string,
    createComment: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mergeComments: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { commentId, mergeComments, mergePosts, parentId } = this.props;
    doGetPostsId(mergePosts, parentId);
    if (commentId) {
      getCommentsId(commentId).then(comment => {
        if (comment.error) {
          mergeComments([{ id: commentId, timestamp: 0, deleted: false }]);
        } else {
          if (comment.id === commentId) {
            mergeComments([comment]);
          } else {
            mergeComments([{ id: commentId, timestamp: 0, deleted: true }]);
          }
        }
      });
    }
  }

  add = values => {
    const { category, createComment, mergeComments, history } = this.props;

    const theUUID = uuid.v4();
    const comment = {
      id: theUUID,
      parentId: values.parentId,
      timestamp: Date.now(),
      body: values.body ? values.body : '',
      author: values.author ? values.author : '',
    };

    createComment(comment);

    postComments(comment).then(resultComment => {
      mergeComments([resultComment]);
    });
    history.push(`/${category}/${values.parentId}`);
  };
  edit = values => {
    const { category, changeComment, mergeComments, history } = this.props;

    const comment = {
      id: values.id,
      timestamp: Date.now(),
      body: values.body,
    };

    changeComment(comment);

    putCommentsId(comment).then(resultComment => {
      mergeComments([resultComment]);
    });
    history.push(`/${category}/${values.parentId}`);
  };
  render() {
    const { category, commentId, parentId, post } = this.props;

    return (
      <div className="CommentCreateEditView">
        {commentId
          ? <CommentFormEdit
              category={category}
              parentId={parentId}
              commentId={commentId}
              post={post}
              onSubmit={this.edit}
            />
          : <CommentFormAdd
              category={category}
              parentId={parentId}
              post={post}
              onSubmit={this.add}
            />}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, ownProps) => {
  const commentId = ownProps.match.params.commentId;
  const parentId = ownProps.match.params.postId;
  const category = ownProps.match.params.category;

  return {
    category: category,
    commentId: commentId,
    parentId: parentId,
    post: posts[ownProps.match.params.postId],
  };
};

const mapDispatchToProps = dispatch => ({
  mergeComments: data => dispatch(syncComments(data)),
  mergePosts: data => dispatch(syncPosts(data)),
  createComment: data => dispatch(addComment(data)),
  changeComment: data => dispatch(editComment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentCreateEditView
);
