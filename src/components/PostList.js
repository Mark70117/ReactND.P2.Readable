import React from 'react';
import PropTypes from 'prop-types';
import PostDetailsLink from './PostDetailsLink';
import { dateFromEpochInt } from '../utils/date.js';

const PostList = ({ posts }) =>
  <ol>
    {posts.map(post =>
      <li key={post.id}>
        {post.voteScore},<PostDetailsLink postId={post.id}>
          {post.title}
        </PostDetailsLink>,{dateFromEpochInt(post.timestamp)}
      </li>
    )}
  </ol>;

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
