import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';
import { dateFromEpochInt } from '../utils/date.js';

const CommentList = ({ comments, onUpVote, onDownVote }) =>
  <ol>
    {comments.map(comment =>
      <CommentListItem
        comment={comment}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    )}
  </ol>;

CommentList.propTypes = {
  comment: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default CommentList;
