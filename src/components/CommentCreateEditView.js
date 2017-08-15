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
  componentDidMount() {
    console.log('CommentCreateEditView componentDidMount');
  }

  add = values => {
    const { mergeComments, history, commentId } = this.props;

    console.log('CommentCreateEditView add' + JSON.stringify(values, null, 4));
    const theUUID = uuid.v4();
    const comment = {
      id: theUUID,
      parentId: values.parentId,
      timestamp: Date.now(),
      body: values.body ? values.body : '',
      author: values.author ? values.author : '',
    };
    console.log(
      'CommentCreateEditView add comment' + JSON.stringify(comment, null, 4)
    );
    addComment(comment);
    postComments(comment).then(resultComment => {
      console.log(
        'CommentCreateEditView add resultComment' +
          JSON.stringify(resultComment, null, 4)
      );
      mergeComments([resultComment]);
    });
    history.push(`/postdetails/${values.parentId}`);
  };
  edit = values => {
    const { mergeComments, history, commentId } = this.props;

    console.log('CommentCreateEditView edit' + JSON.stringify(values, null, 4));
    const comment = {
      id: values.id,
      timestamp: Date.now(),
      body: values.body,
    };
    console.log(
      'CommentCreateEditView edit comment' + JSON.stringify(comment, null, 4)
    );
    editComment(comment);
    putCommentsId(comment).then(resultComment => {
      console.log(
        'CommentCreateEditView edit resultComment' +
          JSON.stringify(resultComment, null, 4)
      );
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
  console.log(
    'CommentCreateEditView mapStateToProps' + JSON.stringify(ownProps, null, 4)
  );
  const commentId = ownProps.match.params.commentId;
  const parentId = ownProps.match.params.postId;
  console.log(
    'CommentCreateEditView mapStateToProps commentId' +
      JSON.stringify(commentId, null, 4)
  );
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
