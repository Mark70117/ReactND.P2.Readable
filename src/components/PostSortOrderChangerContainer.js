import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostSortOrderChanger from './PostSortOrderChanger';
import { setPostSortOrder } from '../actions';

class PostSortOrderChangerContainer extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    moveToShelf: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { moveToShelf } = this.props;

    moveToShelf(event.target.value);
  };

  render() {
    const { value, changePostSortOrder } = this.props;

    return (
      <PostSortOrderChanger value={value} onChange={changePostSortOrder} />
    );
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