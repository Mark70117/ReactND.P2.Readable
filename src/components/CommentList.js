import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';

const CommentList = ({ category, comments, onUpVote, onDownVote, onDelete }) =>
  <ol>
    {comments.map(comment =>
      <CommentListItem
        key={comment.id}
        category={category}
        comment={comment}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onDelete={onDelete}
      />
    )}
  </ol>;

CommentList.propTypes = {
  category: PropTypes.string.isRequired,
  comments: PropTypes.array,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentList;
