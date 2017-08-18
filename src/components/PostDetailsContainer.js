import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PostDetails from './PostDetails';

import { deletePostsId, postPostsId } from '../utils/api';
import { syncPosts } from '../actions';
import { doGetPostsId } from '../utils/shared';

class PostDetailsContainer extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    post: PropTypes.object,
    mergePosts: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const { postId, mergePosts } = this.props;
    doGetPostsId(mergePosts, postId);
  }

  onDelete = () => {
    const { post, mergePosts } = this.props;

    mergePosts([{ ...post, deleted: true, timestamp: Date.now() }]);
    deletePostsId(post.id);
  };

  onUpVote = () => {
    const { post, mergePosts } = this.props;

    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore + 1 }]);
    postPostsId(post.id, 'upVote').then(post => {
      mergePosts([post]);
    });
  };

  onDownVote = () => {
    const { post, mergePosts } = this.props;

    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore - 1 }]);

    postPostsId(post.id, 'downVote').then(post => {
      mergePosts([post]);
    });
  };

  render() {
    const { post } = this.props;

    return (
      <PostDetails
        post={post}
        onDelete={this.onDelete}
        onUpVote={this.onUpVote}
        onDownVote={this.onDownVote}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts[ownProps.postId],
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(PostDetailsContainer)
);
