import React from 'react';
import PropTypes from 'prop-types';
import PostDetailsLink from './PostDetailsLink';
import PostListItem from './PostListItem';
import { dateFromEpochInt } from '../utils/date.js';

const PostList = ({ posts, onUpVote, onDownVote }) =>
  <ol>
    {posts.map(post =>
      <PostListItem post={post} onUpVote={onUpVote} onDownVote={onDownVote} />
    )}
  </ol>;

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default PostList;
