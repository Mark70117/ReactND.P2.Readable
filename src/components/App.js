import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryNavContainer from './CategoryNavContainer';
import PostListContainer from './PostListContainer';
import './../App.css';

class App extends React.Component {
  // REFACTOR rename from App

  render() {
    const { match } = this.props;
    return (
      <div className="App">
        <CategoryNavContainer />
        <PostListContainer match={match} />
      </div>
    );
  }
}

App.propTypes = { match: PropTypes.object.isRequired };

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
