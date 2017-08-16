import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SortOrderChanger from './SortOrderChanger';
import { setCommentSortOrder } from '../actions';

const CommentSortOrderChangerContainer = ({ value, changeCommentSortOrder }) =>
  <SortOrderChanger value={value} onChange={changeCommentSortOrder} />;

CommentSortOrderChangerContainer.propTypes = {
  value: PropTypes.string.isRequired,
  changeCommentSortOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  value: state.commentSortOrder.str,
});

const mapDispatchToProps = dispatch => ({
  changeCommentSortOrder: data => dispatch(setCommentSortOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentSortOrderChangerContainer
);
