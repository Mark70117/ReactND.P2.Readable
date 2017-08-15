import React from 'react';
import PropTypes from 'prop-types';
import PostDetailsLink from './PostDetailsLink';
import PostListItem from './PostListItem';
import { dateFromEpochInt } from '../utils/date.js';

const PostList = ({ posts, comments, onUpVote, onDownVote }) =>
  <ol>
    {posts.map(post => {
      const commentCount = comments.filter(
        comment => comment.parentId === post.id
      ).length;

      return (
        <PostListItem
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
