import React from 'react';
import PropTypes from 'prop-types';
import PostListItem from './PostListItem';

const PostList = ({ posts, comments, onUpVote, onDownVote }) =>
  <ol>
    {posts.map(post => {
      const commentCount = comments.filter(
        comment => comment.parentId === post.id
      ).length;

      return (
        <PostListItem
          key={post.id}
          post={post}
          commentCount={commentCount}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      );
    })}
  </ol>;

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default PostList;
