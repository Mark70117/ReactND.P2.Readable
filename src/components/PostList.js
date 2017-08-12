import React from 'react';
import PropTypes from 'prop-types';
import PostDetailsLink from './PostDetailsLink';

const PostList = ({ posts }) =>
  <ol>
    {posts.map(post =>
      <li key={post.id}>
        <PostDetailsLink postId={post.id}>{post.title}</PostDetailsLink>,{post.voteScore},{post.timestamp}
      </li>
    )}
  </ol>;

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
