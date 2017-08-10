import React from 'react';
import PropTypes from 'prop-types';

const PostList = ({ posts }) =>
  <ol>
    {posts.map(post =>
      <li key={post.id}>
        {post.title},{post.voteScore},{post.timestamp}
      </li>
    )}
  </ol>;

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
