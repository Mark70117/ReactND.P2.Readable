import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from './PostList';
import PostSortOrderChangerContainer from './PostSortOrderChangerContainer';
import { getPosts } from '../utils/api';
import { getCategoryPosts } from '../utils/api';
import { syncPosts } from '../actions';
import { NavLink } from 'react-router-dom';
import { postPostsId } from '../utils/api';

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
  handleUpVote = post => {
    const { mergePosts } = this.props;
    console.log(
      'PostListContainer handleUpVote event' + JSON.stringify(post, null, 4)
    );

    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore + 1 }]);
    postPostsId(post.id, 'upVote').then(post => {
      mergePosts([post]);
    });
  };
  handleDownVote = post => {
    const { mergePosts } = this.props;
    console.log(
      'PostListContainer handleDownVote event' + JSON.stringify(post, null, 4)
    );

    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore - 1 }]);
    postPostsId(post.id, 'downVote').then(post => {
      mergePosts([post]);
    });
  };
  render() {
    const { posts } = this.props;
    console.log(
      'PostListContainer render posts:' + JSON.stringify(posts, null, 4)
    );

    return (
      <div>
        <NavLink to="/postedit">New Post</NavLink>
        <PostSortOrderChangerContainer />
        <PostList
          posts={posts}
          onUpVote={this.handleUpVote}
          onDownVote={this.handleDownVote}
        />
      </div>
    );
  }
}

PostListContainer.propTypes = {
  match: PropTypes.object, // from route??
};

const mapStateToProps = (state, ownProps) => {
  console.log('PostListContainer ownProps' + JSON.stringify(ownProps, null, 4));
  const categoryStr = ownProps.match.params.categoryStr
    ? ownProps.match.params.categoryStr
    : '';
  console.log(
    'PostListContainer categoryStr' + JSON.stringify(categoryStr, null, 4)
  );

  return {
    posts: Object.values(state.posts)
      .filter(post => !post.deleted)
      .filter(post => categoryStr === '' || post.category === categoryStr)
      .sort(state.postSortOrder.func), // when all the sorting and deleting going to happen TODO
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
