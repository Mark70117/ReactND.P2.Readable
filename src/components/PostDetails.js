import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { onDelete } = this.props;
  };
  loadingPost() {
    return <div className="post-details">Loading...</div>;
  }
  livePost(post) {
    return (
      <div className="post-details">
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
            Timestamp: {post.timestamp}
          </li>
          <li>
            VoteScore: {post.voteScore}
          </li>
        </ul>
      </div>
    );
  }
  deletedPost() {
    return <div className="post-details">Post has been deleted</div>;
  }

  render() {
    const { post, onEdit, onDelete } = this.props;
    return post
      ? post.deleted ? this.deletedPost() : this.livePost(post)
      : this.loadingPost();
  }
}

export default PostDetails;
