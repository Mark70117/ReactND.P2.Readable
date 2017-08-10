import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryNavContainer from './CategoryNavContainer';
import './../App.css';

import { getPosts } from '../utils/api'; //DEBUG
import { getPostsId } from '../utils/api'; //DEBUG
import { getPostsIdComments } from '../utils/api'; //DEBUG
import { getCommentsId } from '../utils/api'; //DEBUG

class App extends React.Component {
  componentDidMount() {
    console.log('App componentDidMount');
    getPosts().then(posts => {
      console.log('DEBUG getPosts posts :' + JSON.stringify(posts, null, 4));
    });
    getPostsId('8xf0y6ziyjabvozdd253nd').then(post => {
      console.log('DEBUG getPostId post :' + JSON.stringify(post, null, 4));
    });
    getPostsIdComments('8xf0y6ziyjabvozdd253nd').then(comments => {
      console.log(
        'DEBUG getPostsIdComments comments :' +
          JSON.stringify(comments, null, 4)
      );
    });
    getCommentsId('8tu4bsun805n8un48ve89').then(comment => {
      console.log(
        'DEBUG getCommentsId comment :' + JSON.stringify(comment, null, 4)
      );
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
        <CategoryNavContainer />
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
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
