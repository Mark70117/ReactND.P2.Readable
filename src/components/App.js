import React from 'react';
import { connect } from 'react-redux';
import CategoryNavContainer from './CategoryNavContainer';
import PostListContainer from './PostListContainer';
import './../App.css';

class App extends React.Component {
  componentDidMount() {
    console.log('App componentDidMount');
  }
  render() {
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
        <CategoryNavContainer />
        <PostListContainer />
      </div>
    );
  }
}

App.propTypes = {};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
