import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'js-uuid';
import CommentFormEdit from './CommentFormEdit';
import CommentFormAdd from './CommentFormAdd';
import { putCommentsId, postComments } from '../utils/api';
import { syncComments, editComment, addComment } from '../actions';
//import { getCategories } from '../utils/api';
//import { syncCategories } from '../actions';

class CommentCreateEditView extends React.Component {
  add = values => {
    const { mergeComments, history } = this.props;

    const theUUID = uuid.v4();
    const comment = {
      id: theUUID,
      parentId: values.parentId,
      timestamp: Date.now(),
      body: values.body ? values.body : '',
      author: values.author ? values.author : '',
    };

    addComment(comment);
    postComments(comment).then(resultComment => {
      mergeComments([resultComment]);
    });
    history.push(`/postdetails/${values.parentId}`);
  };
  edit = values => {
    const { mergeComments, history } = this.props;

    const comment = {
      id: values.id,
      timestamp: Date.now(),
      body: values.body,
    };

    editComment(comment);
    putCommentsId(comment).then(resultComment => {
      mergeComments([resultComment]);
    });
    history.push(`/postdetails/${values.parentId}`);
  };
  render() {
    const { dummy, commentId, parentId } = this.props;

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

CommentCreateEditView.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const commentId = ownProps.match.params.commentId;
  const parentId = ownProps.match.params.postId;

  return {
    dummy: state.dummy,
    commentId: commentId,
    parentId: parentId,
  };
};

const mapDispatchToProps = dispatch => ({
  mergeComments: data => dispatch(syncComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentCreateEditView
);
