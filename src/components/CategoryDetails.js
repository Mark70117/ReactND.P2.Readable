import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryLink from './CategoryLink';

class CategoryDetails extends React.Component {
  componentDidMount() {
    console.log('CategoryDetails componentDidMount');
  }
  render() {
    const { dummy, match } = this.props;
    console.log('CategoryDetails' + match);

    return (
      <div>
        <h1>
          {match.params.categoryStr}
        </h1>
        <CategoryLink category={'redux'}>Redux</CategoryLink>
        <CategoryLink category={'react'}>React</CategoryLink>
        <CategoryLink category={'udacituy'}> Udacity</CategoryLink>
      </div>
    );
  }
}

CategoryDetails.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
