import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../utils/api';
import { syncCategories } from '../actions';
import CategoryLink from './CategoryLink';
import './../App.css';

class App extends React.Component {
  componentDidMount() {
    const { setCategories } = this.props;
    console.log('fluf');
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
      <div className="App">
        <ul>
          <li>
            TODO should list all available categories, which should link to a
            category view for that category
          </li>
          <li>
            TODO should list all of the posts ordered by voteScore (highest
            score first)
          </li>
          <li>
            TODO should have a control for changing the sort method for the
            list, including at minimum, order by voteScore and order by
            timestamp
          </li>
          <li>TODO should have a control for adding a new post</li>
        </ul>
        <CategoryLink category={'redux'}>Redux</CategoryLink>
        <CategoryLink category={'react'}>React</CategoryLink>
        <CategoryLink category={'udacituy'}> Udacity</CategoryLink>
      </div>
    );
  }
}

App.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
