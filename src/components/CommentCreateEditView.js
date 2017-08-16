import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'js-uuid';
import CommentFormEdit from './CommentFormEdit';
import CommentFormAdd from './CommentFormAdd';
import { putCommentsId, postComments } from '../utils/api';
import { syncComments, editComment, addComment } from '../actions';

class CommentCreateEditView extends React.Component {
  static propTypes = {
    changeComment: PropTypes.func.isRequired,
    commentId: PropTypes.string,
    createComment: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mergeComments: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
  };

  add = values => {
    const { createComment, mergeComments, history } = this.props;

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
    history.push(`/postdetails/${values.parentId}`);
  };
  edit = values => {
    const { changeComment, mergeComments, history } = this.props;

    const comment = {
      id: values.id,
      timestamp: Date.now(),
      body: values.body,
    };

    changeComment(comment);

    putCommentsId(comment).then(resultComment => {
      mergeComments([resultComment]);
    });
    history.push(`/postdetails/${values.parentId}`);
  };
  render() {
    const { commentId, parentId } = this.props;

    return (
      <div className="CommentCreateEditView">
        {commentId
          ? <CommentFormEdit
              parentId={parentId}
              commentId={commentId}
              onSubmit={this.edit}
            />
          : <CommentFormAdd parentId={parentId} onSubmit={this.add} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const commentId = ownProps.match.params.commentId;
  const parentId = ownProps.match.params.postId;

  return {
    commentId: commentId,
    parentId: parentId,
  };
};

const mapDispatchToProps = dispatch => ({
  mergeComments: data => dispatch(syncComments(data)),
  createComment: data => dispatch(addComment(data)),
  changeComment: data => dispatch(editComment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentCreateEditView
);
