import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostDetailsLink from './PostDetailsLink';
import { dateFromEpochInt } from '../utils/date.js';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';

class PostListItem extends Component {
  static propTypes = {
    post: PropTypes.array.isRequired,
    onUpVote: PropTypes.func.isRequired,
  };
  handleUpVote = event => {
    const { post, onUpVote } = this.props;
    console.log('handleUpVote event' + JSON.stringify(post.id, null, 4));
    onUpVote(post);
  };
  handleDownVote = event => {
    const { post, onDownVote } = this.props;
    console.log('handleDownVote event' + JSON.stringify(post.id, null, 4));
    onDownVote(post);
  };
  render() {
    const { post, onUpVote, onDownVote } = this.props;
    return (
      <li key={post.id}>
        {post.voteScore},<PostDetailsLink postId={post.id}>
          {post.title}
        </PostDetailsLink>,{dateFromEpochInt(post.timestamp)},{' '}
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

export default PostListItem;
