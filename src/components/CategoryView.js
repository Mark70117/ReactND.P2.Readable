import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryTodo from './CategoryTodo';
import CategoryDetails from './CategoryDetails';

class CategoryView extends React.Component {
  componentDidMount() {
    console.log('CategoryView componentDidMount');
  }
  render() {
    const { dummy } = this.props;

    return (
      <Switch>
        <Route exact path="/category" component={CategoryTodo} />
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
