import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from './PostList';
import { getPosts } from '../utils/api';
import { getCategoryPosts } from '../utils/api';
import { syncPosts } from '../actions';

const getAppropriatePost = (mergePosts, match) => {
  if (match && match.params && match.params.categoryStr) {
    getCategoryPosts(match.params.categoryStr).then(posts => {
      console.log(
        'PostListContainer componentDidMount posts :' +
          JSON.stringify(posts, null, 4)
      );
      mergePosts(posts);
    });
  } else {
    getPosts().then(posts => {
      console.log(
        'PostListContainer componentDidMount posts :' +
          JSON.stringify(posts, null, 4)
      );
      mergePosts(posts);
    });
  }
};
class PostListContainer extends React.Component {
  componentDidMount() {
    const { mergePosts, match } = this.props;

    console.log(
      'PostListContainer componentDidMount ' + JSON.stringify(match, null, 4)
    );
    getAppropriatePost(mergePosts, match);
  }
  componentDidUpdate(prevProps) {
    console.log(
      'PostListContainer componentDidUpdate ' +
        JSON.stringify(prevProps, null, 4)
    );
    console.log(
      'PostListContainer componentDidUpdate ' +
        JSON.stringify(this.props, null, 4)
    );
    if (
      prevProps.match &&
      this.props.match &&
      prevProps.match.params.categoryStr !== this.props.match.params.categoryStr
    ) {
      getAppropriatePost(this.props.mergePosts, this.props.match);
    }
  }
  render() {
    const { posts } = this.props;
    console.log(
      'PostListContainer render posts:' + JSON.stringify(posts, null, 4)
    );

    return (
      <div>
        <PostList posts={posts} />
      </div>
    );
  }
}

PostListContainer.propTypes = {
  match: PropTypes.object, // from route??
};

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
