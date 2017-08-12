import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetails from './PostDetails';
import { setPostSortOrder } from '../actions';
import { getPostsId } from '../utils/api';
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
    console.log('TODO');
  };

  render() {
    const { post } = this.props;

    return (
      <PostDetails post={post} onEdit={this.onEdit} onDelete={this.onDelete} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(
    'PostDetailsContainer ownProps' + JSON.stringify(ownProps, null, 4)
  );

  return {
    post: state.posts[ownProps.postId], // FIX
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostDetailsContainer
);
