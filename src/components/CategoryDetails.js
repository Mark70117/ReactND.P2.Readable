import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryNavContainer from './CategoryNavContainer';

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
        <CategoryNavContainer />
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
