import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SortOrderChanger from './SortOrderChanger';
import { setPostSortOrder } from '../actions';

const PostSortOrderChangerContainer = ({ value, changePostSortOrder }) =>
  <SortOrderChanger value={value} onChange={changePostSortOrder} />;

PostSortOrderChangerContainer.propTypes = {
  value: PropTypes.string.isRequired,
  changePostSortOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  value: state.postSortOrder.str,
});

const mapDispatchToProps = dispatch => ({
  changePostSortOrder: data => dispatch(setPostSortOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostSortOrderChangerContainer
);
