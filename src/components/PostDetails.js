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
    onDelete: PropTypes.func.isRequired,
  };

  handleDelete = event => {
    const { post, onDelete } = this.props;
    onDelete();
  };
  handleUpVote = event => {
    const { post, onUpVote } = this.props;
    onUpVote();
  };
  handleDownVote = event => {
    const { post, onDownVote } = this.props;
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
        <br />
        [Votes: {post.voteScore}]
        <button className="icon-btn" onClick={this.handleUpVote}>
          <FaArrowUp size={10} />
        </button>
        <button className="icon-btn" onClick={this.handleDownVote}>
          <FaArrowDown size={10} />
        </button>
        <button className="icon-btn" onClick={this.handleDelete}>
          <FaTrash size={10} />
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
            Category: {post.category}
          </li>
          <li>
            Timestamp: {dateFromEpochInt(post.timestamp)}
          </li>
        </ul>
        <hr />
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
