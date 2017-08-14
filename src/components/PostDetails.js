import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { dateFromEpochInt } from '../utils/date.js';
import FaTrash from 'react-icons/lib/fa/trash';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import CommentListContainer from './CommentListContainer';

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
  handleUpVote = event => {
    const { post, onUpVote } = this.props;
    console.log('handleUpVote event' + JSON.stringify(post.id, null, 4));
    onUpVote();
  };
  handleDownVote = event => {
    const { post, onDownVote } = this.props;
    console.log('handleDownVote event' + JSON.stringify(post.id, null, 4));
    onDownVote();
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
        <button className="icon-btn" onClick={this.handleUpVote}>
          <FaArrowUp size={16} />
        </button>
        <button className="icon-btn" onClick={this.handleDownVote}>
          <FaArrowDown size={16} />
        </button>
        <NavLink to={'/postedit/' + post.id}>Edit</NavLink>
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
        <hr />
        <h2>Comments</h2>
        <CommentListContainer postId={post.id} />
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
