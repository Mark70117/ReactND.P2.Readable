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
    mergePosts(posts);
    posts
      .filter(post => !post.deleted)
      .map(post => getAppropriateComment(post.id, mergeComments));
  });
};

class PostListContainer extends React.Component {
  static propTypes = {
    comments: PropTypes.array,
    match: PropTypes.object.isRequired,
    mergeComments: PropTypes.func.isRequired,
    mergePosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { mergePosts, mergeComments, match } = this.props;

    getAppropriatePost(mergePosts, mergeComments, match);
  }
  componentDidUpdate(prevProps) {
    const { match, mergeComments, mergePosts } = this.props;
    if (
      prevProps.match &&
      match &&
      prevProps.match.params.categoryStr !== match.params.categoryStr
    ) {
      getAppropriatePost(mergePosts, mergeComments, match); //REFACTOR  this.props be gone
    }
  }
  handleUpVote = post => {
    const { mergePosts } = this.props;

    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore + 1 }]);
    postPostsId(post.id, 'upVote').then(post => {
      mergePosts([post]);
    });
  };
  handleDownVote = post => {
    const { mergePosts } = this.props;

    const currVoteScore = post.voteScore;
    mergePosts([{ ...post, voteScore: currVoteScore - 1 }]);
    postPostsId(post.id, 'downVote').then(post => {
      mergePosts([post]);
    });
  };
  render() {
    const { posts, comments } = this.props;

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

const mapStateToProps = ({ comments, posts, postSortOrder }, { match }) => {
  const categoryStr = match.params.categoryStr ? match.params.categoryStr : '';

  return {
    posts: Object.values(posts)
      .filter(post => !post.deleted)
      .filter(post => categoryStr === '' || post.category === categoryStr)
      .sort(postSortOrder.func),
    comments: Object.values(comments)
      .filter(comment => !comment.deleted)
      .filter(comment => !comment.parentDeleted),
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
  mergeComments: data => dispatch(syncComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
