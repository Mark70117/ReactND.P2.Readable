import React from 'react';
import PropTypes from 'prop-types';
import CategoryNavContainer from './CategoryNavContainer';
import PostListContainer from './PostListContainer';
import './../App.css';

const App = ({ match }) =>
  <div className="App">
    <CategoryNavContainer />
    <PostListContainer match={match} />
  </div>;

App.propTypes = { match: PropTypes.object.isRequired };

export default App;
