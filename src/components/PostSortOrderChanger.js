import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostSortOrderChanger extends Component {
  static propTypes = {
    sortOrder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  handleChange = event => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const { sortOrder, onChange } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={sortOrder} onChange={this.handleChange}>
          <option value="postSortVoteAscending">Votes (ascending)</option>
          <option value="postSortVoteDecending">Votes (descending)</option>
          <option value="postSortTimestampAscending">
            Timestamp (ascending)
          </option>
          <option value="postSortTimeStampDecending">
            TimeStamp (descending)
          </option>
        </select>
      </div>
    );
  }
}

export default PostSortOrderChanger;
