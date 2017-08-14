import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentSortOrderChanger extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  handleChange = event => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={value} onChange={this.handleChange}>
          <option value="commentSortVoteAscending">Votes (ascending)</option>
          <option value="commentSortVoteDecending">Votes (descending)</option>
          <option value="commentSortTimestampAscending">
            Timestamp (ascending)
          </option>
          <option value="commentSortTimeStampDecending">
            TimeStamp (descending)
          </option>
        </select>
      </div>
    );
  }
}

export default CommentSortOrderChanger;
