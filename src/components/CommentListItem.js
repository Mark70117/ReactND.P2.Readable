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

    onUpVote(comment);
  };
  handleDownVote = event => {
    const { comment, onDownVote } = this.props;

    onDownVote(comment);
  };
  handleDelete = event => {
    const { comment, onDelete } = this.props;

    onDelete(comment);
  };
  render() {
    const { comment } = this.props;
    return (
      <li key={comment.id}>
        {comment.body}
        --{comment.author}
        <br />
        [votes: {comment.voteScore}]
        <button className="icon-btn" onClick={this.handleUpVote}>
          <FaArrowUp size={10} />
        </button>
        <button className="icon-btn" onClick={this.handleDownVote}>
          <FaArrowDown size={10} />
        </button>,
        {dateFromEpochInt(comment.timestamp)}
        <button className="icon-btn" onClick={this.handleDelete}>
          <FaTrash size={10} />
        </button>
        <NavLink to={'/commentedit/' + comment.parentId + '/' + comment.id}>
          Edit
        </NavLink>
      </li>
    );
  }
}

export default CommentListItem;
