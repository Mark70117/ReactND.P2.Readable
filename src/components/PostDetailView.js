import React from 'react';
import PropTypes from 'prop-types';
import PostDetailsContainer from './PostDetailsContainer';

const PostDetailView = ({ match }) =>
  <div className="PostDetailView">
    <PostDetailsContainer
      category={match.params.category}
      postId={match.params.postId}
    />
  </div>;

PostDetailView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostDetailView;
