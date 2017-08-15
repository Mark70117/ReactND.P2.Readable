import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from './PostList';
import PostSortOrderChangerContainer from './PostSortOrderChangerContainer';
import { getPosts } from '../utils/api';
import { getCategoryPosts } from '../utils/api';
import { syncPosts, syncComments } from '../actions';
import { NavLink } from 'react-router-dom';
import { postPostsId } from '../utils/api';
import { getAppropriateComment } from '../utils/shared';

const getAppropriatePost = (mergePosts, mergeComments, match) => {
  let postGetter;
  if (match && match.params && match.params.categoryStr) {
    postGetter = getCategoryPosts(match.params.categoryStr);
  } else {
    postGetter = getPosts();
  }
  postGetter.then(posts => {
    console.log(
      'PostListContainer componentDidMount posts :' +
        JSON.stringify(posts, null, 4)
    );
    mergePosts(posts);
    posts
      .filter(post => !post.deleted)
      .map(post => getAppropriateComment(post.id, mergeComments));
  });
};

class PostListContainer extends React.Component {
  componentDidMount() {
    const { mergePosts, mergeComments, match } = this.props;

    console.log(
      'PostListContainer componentDidMount ' + JSON.stringify(match, null, 4)
    );
    getAppropriatePost(mergePosts, mergeComments, match);
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
      getAppropriatePost(
        this.props.mergePosts,
        this.props.mergeComments,
        this.props.match
      ); //REFACTOR  this.props be gone
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
    const { posts, comments } = this.props;
    console.log(
      'PostListContainer render posts:' + JSON.stringify(posts, null, 4)
    );

    return (
      <div>
        <NavLink to="/postedit">New Post</NavLink>
        <PostSortOrderChangerContainer />
        <PostList
          posts={posts}
          comments={comments}
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
    comments: Object.values(state.comments), // REFACTOR filter  comment => comment.parentId in posts
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
  mergeComments: data => dispatch(syncComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
