//https://egghead.io/lessons/javascript-redux-fetching-data-on-route-change
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import CategoryNavContainer from './CategoryNavContainer';
import PostListContainer from './PostListContainer';

const CategoryDetails = ({ match }) =>
  <div>
    <NavLink to="/">Home</NavLink>
    <h1>
      {match.params.categoryStr}
    </h1>
    <CategoryNavContainer match={match} />
    <PostListContainer match={match} />
  </div>;

CategoryDetails.propTypes = {
  match: PropTypes.object,
};

export default withRouter(CategoryDetails);
