//https://egghead.io/lessons/javascript-redux-navigating-with-react-router-link?series=building-react-applications-with-idiomatic-redux

import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const PostDetailsLink = ({ category, children, postId }) =>
  <NavLink
    exact
    to={'/' + category + '/' + postId}
    className="nav"
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </NavLink>;

PostDetailsLink.propTypes = {
  category: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  postId: PropTypes.string.isRequired,
};

export default PostDetailsLink;
