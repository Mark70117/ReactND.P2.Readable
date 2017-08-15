import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import CommentSortOrderChangerContainer from './CommentSortOrderChangerContainer'; //FIX
import {
  getPostsIdComments,
  deleteCommentsId,
  postCommentsId,
} from '../utils/api';
//import { getCategoryPosts } from '../utils/api';
import { syncComments } from '../actions';
import { NavLink } from 'react-router-dom';
//import { postPostsId } from '../utils/api';
import { getAppropriateComment } from '../utils/shared';

class CommentListContainer extends React.Component {
  componentDidMount() {
    const { postId, mergeComments } = this.props;

    console.log(
      'CommentListContainer componentDidMount postId' +
        JSON.stringify(postId, null, 4)
    );
    getAppropriateComment(postId, mergeComments);
  }

  handleUpVote = comment => {
    const { mergeComments } = this.props;
    console.log(
      'CommentDetailsContainer handleUpVote' + JSON.stringify(comment, null, 4)
    );
    const currVoteScore = comment.voteScore;
    mergeComments([{ ...comment, voteScore: currVoteScore + 1 }]);
    postCommentsId(comment.id, 'upVote').then(comment => {
      mergeComments([comment]);
    });
  };

  handleDownVote = comment => {
    const { mergeComments } = this.props;
    console.log(
      'CommentDetailsContainer handleDownVote' +
        JSON.stringify(comment, null, 4)
    );
    const currVoteScore = comment.voteScore;
    mergeComments([{ ...comment, voteScore: currVoteScore - 1 }]);
    postCommentsId(comment.id, 'downVote').then(comment => {
      mergeComments([comment]);
    });
  };

  handleDelete = comment => {
    const { mergeComments } = this.props;

    console.log('CommentDetailsContainer handleDelete');

    mergeComments([{ ...comment, deleted: true, timestamp: Date.now() }]);
    deleteCommentsId(comment.id);
  };
  render() {
    const { postId, comments } = this.props;
    console.log(
      'CommentListContainer render comments:' +
        JSON.stringify(comments, null, 4)
    );

    return (
      <div>
        <h2>
          Comments (n={comments.length})
        </h2>

        <NavLink to={'/commentedit/' + postId}>New Comment</NavLink>
        <CommentSortOrderChangerContainer />
        <CommentList
          comments={comments}
          onUpVote={this.handleUpVote}
          onDownVote={this.handleDownVote}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

CommentListContainer.propTypes = {
  match: PropTypes.object, // from route??
  postId: PropTypes.string,
  comments: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  console.log(
    'CommentListContainer ownProps' + JSON.stringify(ownProps, null, 4)
  );
  // const categoryStr = ownProps.match.params.categoryStr
  //   ? ownProps.match.params.categoryStr
  //   : '';
  // console.log(
  //   'PostListContainer categoryStr' + JSON.stringify(categoryStr, null, 4)
  // );
  console.log(
    'CommentListContainer state.comments' +
      JSON.stringify(state.comments, null, 4)
  );
  return {
    comments: Object.values(state.comments)
      .filter(comment => comment.parentId === ownProps.postId)
      .filter(comment => !comment.deleted)
      .filter(comment => !comment.parentDeleted)
      .sort(state.commentSortOrder.func), // when all the sorting and deleting going to happen TODO
  };
};

const mapDispatchToProps = dispatch => ({
  mergeComments: data => dispatch(syncComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentListContainer
);
