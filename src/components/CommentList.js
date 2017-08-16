import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';
import { dateFromEpochInt } from '../utils/date.js';

const CommentList = ({ comments, onUpVote, onDownVote, onDelete }) =>
  <ol>
    {comments.map(comment =>
      <CommentListItem
        key={comment.id}
        comment={comment}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onDelete={onDelete}
      />
    )}
  </ol>;

CommentList.propTypes = {
  comments: PropTypes.array,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentList;
