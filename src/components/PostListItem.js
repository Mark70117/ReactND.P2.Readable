import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostDetailsLink from './PostDetailsLink';
import { dateFromEpochInt } from '../utils/date.js';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';

class PostListItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
  };
  handleUpVote = event => {
    const { post, onUpVote } = this.props;
    onUpVote(post);
  };
  handleDownVote = event => {
    const { post, onDownVote } = this.props;
    onDownVote(post);
  };
  render() {
    const { post, commentCount, onUpVote, onDownVote } = this.props;
    return (
      <li key={post.id}>
        <PostDetailsLink postId={post.id}>{post.title}</PostDetailsLink>
        <br />
        [votes:{post.voteScore}]
        <button className="icon-btn" onClick={this.handleUpVote}>
          <FaArrowUp size={10} />
        </button>
        <button className="icon-btn" onClick={this.handleDownVote}>
          <FaArrowDown size={10} />
        </button>
        , [#Comments: {commentCount}],
        {dateFromEpochInt(post.timestamp)}
      </li>
    );
  }
}

export default PostListItem;
