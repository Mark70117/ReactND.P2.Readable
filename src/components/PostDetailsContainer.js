import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import { setPostSortOrder } from '../actions';
import { getPostsId } from '../utils/api';
import { deletePostsId, postPostsId } from '../utils/api';
import { syncPosts } from '../actions';

class PostDetailsContainer extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    post: PropTypes.object,
    mergePosts: PropTypes.func.isRequired,
  };
  componentDidMount() {
    console.log('PostDetailsContainer componentDidMount ');
    const { postId, mergePosts } = this.props;
    getPostsId(postId).then(post => {
      mergePosts([post]);
    });
  }
  onEdit = () => {
    console.log('TODO');
  };

  onDelete = () => {
    const { post, mergePosts } = this.props;

    console.log('PostDetailsContainer onDelete');

    mergePosts([{ ...post, deleted: true, timestamp: Date.now() }]);
    deletePostsId(post.id);
  };

  onUpVote = () => {
    const { post, mergePosts } = this.props;
    console.log(
      'PostDetailsContainer onUpVote' + JSON.stringify(post, null, 4)
    );
    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore + 1 }]);
    postPostsId(post.id, 'upVote').then(post => {
      mergePosts([post]);
    });
  };

  onDownVote = () => {
    const { post, mergePosts } = this.props;
    console.log(
      'PostDetailsContainer onDownVote' + JSON.stringify(post, null, 4)
    );
    const currVoteScore = post.voteScore;
    console.log('onDownVote 1Y' + currVoteScore);
    mergePosts([{ ...post, voteScore: currVoteScore - 1 }]);
    console.log('onDownVote 2Y');

    postPostsId(post.id, 'downVote').then(post => {
      mergePosts([post]);
    });
  };

  render() {
    const { post } = this.props;

    return (
      <PostDetails
        post={post}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
        onUpVote={this.onUpVote}
        onDownVote={this.onDownVote}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(
    'PostDetailsContainer ownProps' + JSON.stringify(ownProps, null, 4)
  );

  return {
    post: state.posts[ownProps.postId],
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostDetailsContainer
);
