import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CommentList from './CommentList';
import CommentSortOrderChangerContainer from './CommentSortOrderChangerContainer';
import { deleteCommentsId, postCommentsId } from '../utils/api';
import { syncComments } from '../actions';
import { getAppropriateComment } from '../utils/shared';

class CommentListContainer extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { postId, mergeComments } = this.props;

    getAppropriateComment(postId, mergeComments);
  }

  handleUpVote = comment => {
    const { mergeComments } = this.props;

    const currVoteScore = comment.voteScore;
    mergeComments([{ ...comment, voteScore: currVoteScore + 1 }]);
    postCommentsId(comment.id, 'upVote').then(comment => {
      mergeComments([comment]);
    });
  };

  handleDownVote = comment => {
    const { mergeComments } = this.props;

    const currVoteScore = comment.voteScore;
    mergeComments([{ ...comment, voteScore: currVoteScore - 1 }]);
    postCommentsId(comment.id, 'downVote').then(comment => {
      mergeComments([comment]);
    });
  };

  handleDelete = comment => {
    const { mergeComments } = this.props;

    mergeComments([{ ...comment, deleted: true, timestamp: Date.now() }]);
    deleteCommentsId(comment.id);
  };
  render() {
    const { category, postId, comments } = this.props;

    return (
      <div>
        <h2>
          Comments (n={comments.length})
        </h2>

        <NavLink to={'/commentedit/' + category + '/' + postId}>
          New Comment
        </NavLink>
        <CommentSortOrderChangerContainer />
        <CommentList
          category={category}
          comments={comments}
          onUpVote={this.handleUpVote}
          onDownVote={this.handleDownVote}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ comments, commentSortOrder }, { postId }) => {
  return {
    comments: Object.values(comments)
      .filter(comment => comment.parentId === postId)
      .filter(comment => !comment.deleted)
      .filter(comment => !comment.parentDeleted)
      .sort(commentSortOrder.func),
  };
};

const mapDispatchToProps = dispatch => ({
  mergeComments: data => dispatch(syncComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentListContainer
);
