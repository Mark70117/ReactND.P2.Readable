import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateFromEpochInt } from '../utils/date.js';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaTrash from 'react-icons/lib/fa/trash';
import { NavLink } from 'react-router-dom';

class CommentListItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  handleUpVote = event => {
    const { comment, onUpVote } = this.props;
    console.log(
      'CommentListItem handleUpVote event' + JSON.stringify(comment.id, null, 4)
    );
    onUpVote(comment);
  };
  handleDownVote = event => {
    const { comment, onDownVote } = this.props;
    console.log(
      'CommentListItem handleDownVote event' +
        JSON.stringify(comment.id, null, 4)
    );
    onDownVote(comment);
  };
  handleDelete = event => {
    const { comment, onDelete } = this.props;
    console.log(
      'CommentListItem handleDelete event' + JSON.stringify(comment.id, null, 4)
    );
    onDelete(comment);
  };
  render() {
    const { comment, onUpVote, onDownVote } = this.props;
    return (
      <li key={comment.id}>
        {comment.voteScore},
        {comment.title},
        {comment.body},
        {comment.author}, ,{dateFromEpochInt(comment.timestamp)},{' '}
        <button className="icon-btn" onClick={this.handleDelete}>
          <FaTrash size={16} />
        </button>
        <button className="icon-btn" onClick={this.handleUpVote}>
          <FaArrowUp size={16} />
        </button>
        <button className="icon-btn" onClick={this.handleDownVote}>
          <FaArrowDown size={16} />
        </button>
        <NavLink to={'/commentedit/' + comment.parentId + '/' + comment.id}>
          Edit
        </NavLink>
      </li>
    );
  }
}

export default CommentListItem;
