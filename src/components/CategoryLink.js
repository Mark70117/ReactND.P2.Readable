//https://egghead.io/lessons/javascript-redux-navigating-with-react-router-link?series=building-react-applications-with-idiomatic-redux

import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const CategoryLink = ({ category, children }) =>
  <NavLink
    exact
    to={'/category/' + category}
    className="nav"
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </NavLink>;

CategoryLink.propTypes = {
  category: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CategoryLink;
