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
          <option value="sortVoteAscending">Votes (ascending)</option>
          <option value="sortVoteDecending">Votes (descending)</option>
          <option value="sortTimestampAscending">Timestamp (ascending)</option>
          <option value="sortTimeStampDecending">TimeStamp (descending)</option>
        </select>
      </div>
    );
  }
}

export default CommentSortOrderChanger;
