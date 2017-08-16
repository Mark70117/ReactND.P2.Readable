import React from 'react';
import PropTypes from 'prop-types';
import CategoryNavContainer from './CategoryNavContainer';
import PostListContainer from './PostListContainer';
import './../DefaultView.css';

const DefaultView = ({ match }) =>
  <div className="DefaultView">
    <CategoryNavContainer />
    <PostListContainer match={match} />
  </div>;

DefaultView.propTypes = { match: PropTypes.object.isRequired };

export default DefaultView;
