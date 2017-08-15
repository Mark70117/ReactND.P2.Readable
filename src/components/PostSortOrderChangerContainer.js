import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SortOrderChanger from './SortOrderChanger';
import { setPostSortOrder } from '../actions';

class PostSortOrderChangerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    changePostSortOrder: PropTypes.func.isRequired,
  };

  render() {
    const { value, changePostSortOrder } = this.props;

    return <SortOrderChanger value={value} onChange={changePostSortOrder} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(
    'PostSortOrderChangerContainer ownProps' + JSON.stringify(ownProps, null, 4)
  );

  return {
    value: state.postSortOrder.str,
  };
};

const mapDispatchToProps = dispatch => ({
  changePostSortOrder: data => dispatch(setPostSortOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostSortOrderChangerContainer
);
