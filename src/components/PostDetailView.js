import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetailsContainer from './PostDetailsContainer';

const PostDetailView = ({ match }) =>
  <div className="PostDetailView">
    <PostDetailsContainer postId={match.params.postId} />
  </div>;

PostDetailView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostDetailView;
