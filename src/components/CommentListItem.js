import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateFromEpochInt } from '../utils/date.js';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';

class CommentListItem extends Component {
  static propTypes = {
    comment: PropTypes.array.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
  };
  handleUpVote = event => {
    const { comment, onUpVote } = this.props;
    console.log('handleUpVote event' + JSON.stringify(comment.id, null, 4));
    onUpVote(comment);
  };
  handleDownVote = event => {
    const { comment, onDownVote } = this.props;
    console.log('handleDownVote event' + JSON.stringify(comment.id, null, 4));
    onDownVote(comment);
  };
  render() {
    const { comment, onUpVote, onDownVote } = this.props;
    return (
      <li key={comment.id}>
        {comment.voteScore},
        {comment.title},
        {comment.body},
        {comment.author}, ,{dateFromEpochInt(comment.timestamp)},{' '}
        <button className="icon-btn" onClick={this.handleUpVote}>
          <FaArrowUp size={16} />
        </button>
        <button className="icon-btn" onClick={this.handleDownVote}>
          <FaArrowDown size={16} />
        </button>
      </li>
    );
  }
}

export default CommentListItem;
