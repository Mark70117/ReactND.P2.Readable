import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentSortOrderChanger from './CommentSortOrderChanger';
import { setCommentSortOrder } from '../actions';

class CommentSortOrderChangerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    changeCommentSortOrder: PropTypes.func.isRequired,
  };

  render() {
    const { value, changeCommentSortOrder } = this.props;

    return (
      <CommentSortOrderChanger
        value={value}
        onChange={changeCommentSortOrder}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(
    'CommentSortOrderChangerContainer ownProps' +
      JSON.stringify(ownProps, null, 4)
  );

  return {
    value: state.commentSortOrder.str,
  };
};

const mapDispatchToProps = dispatch => ({
  changeCommentSortOrder: data => dispatch(setCommentSortOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentSortOrderChangerContainer
);
