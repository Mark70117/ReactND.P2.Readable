//https://egghead.io/lessons/javascript-redux-fetching-data-on-route-change
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import CategoryNavContainer from './CategoryNavContainer';
import PostListContainer from './PostListContainer';

class CategoryDetails extends React.Component {
  componentDidMount() {
    console.log('CategoryDetails componentDidMount');
  }
  render() {
    const { dummy, match } = this.props;
    console.log('CategoryDetails' + JSON.stringify(match, null, 4));

    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <h1>
          {match.params.categoryStr}
        </h1>
        <CategoryNavContainer match={match} />
        <PostListContainer match={match} />
      </div>
    );
  }
}

CategoryDetails.propTypes = {
  dummy: PropTypes.array.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
);
