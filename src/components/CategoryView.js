import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryTodo from './CategoryTodo';
import CategoryDetails from './CategoryDetails';
import { getCategories } from '../utils/api';
import { syncCategories } from '../actions';

class CategoryView extends React.Component {
  componentDidMount() {
    console.log('CategoryView componentDidMount');
    const { setCategories } = this.props;
    getCategories().then(categories => {
      console.log('pre sync ');
      console.log('categories :' + JSON.stringify(categories, null, 4));
      setCategories(categories);
      console.log('post sync');
    });
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
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
