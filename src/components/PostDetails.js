import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { dateFromEpochInt } from '../utils/date.js';
import FaTrash from 'react-icons/lib/fa/trash';

class PostDetails extends Component {
  static propTypes = {
    post: PropTypes.object, // can be undefined if not loaded
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  handleEdit = event => {
    const { onEdit } = this.props;
  };

  handleDelete = event => {
    const { post, onDelete } = this.props;
    console.log('handleDelete event' + JSON.stringify(post.id, null, 4));
    onDelete();
  };
  loadingPost() {
    return (
      <div className="post-details">
        '}<NavLink to="/">Home</NavLink>Loading...
      </div>
    );
  }
  livePost(post) {
    return (
      <div className="post-details">
        <NavLink to="/">Home</NavLink>
        <button className="icon-btn" onClick={this.handleDelete}>
          <FaTrash size={16} />
        </button>
        <NavLink to="/postedit">Edit</NavLink>
        <ul>
          <li>
            Title:{post.title}
          </li>
          <li>
            Body: {post.body}
          </li>
          <li>
            Author: {post.author}
          </li>
          <li>
            Timestamp: {dateFromEpochInt(post.timestamp)}
          </li>
          <li>
            VoteScore: {post.voteScore}
          </li>
        </ul>
      </div>
    );
  }
  deletedPost() {
    return (
      <div className="post-details">
        {' '}<NavLink to="/">Home</NavLink>
        Post has been deleted
      </div>
    );
  }

  render() {
    const { post } = this.props;
    return post
      ? post.deleted ? this.deletedPost() : this.livePost(post)
      : this.loadingPost();
  }
}

export default PostDetails;
