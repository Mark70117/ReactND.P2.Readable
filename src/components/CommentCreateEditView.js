import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'js-uuid';
import CommentFormEdit from './CommentFormEdit';
import CommentFormAdd from './CommentFormAdd';
import { getCommentsId, putCommentsId, postComments } from '../utils/api';
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

  componentDidMount() {
    const { commentId, mergeComments } = this.props;
    if (commentId) {
      getCommentsId(commentId).then(comment => {
        if (comment.error) {
          console.log(
            'comment getCommentsId error' + JSON.stringify(comment, null, 4)
          ); //TODO
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
  const category = ownProps.match.params.category;

  return {
    category: category,
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
