import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryDetails from './CategoryDetails';

class CategoryView extends React.Component {
  render() {
    const { dummy } = this.props;

    return (
      <Switch>
        <Route path="/category/:categoryStr" component={CategoryDetails} />
      </Switch>
    );
  }
}

CategoryView.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
