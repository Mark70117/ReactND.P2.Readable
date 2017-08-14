import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import CommentSortOrderChangerContainer from './CommentSortOrderChangerContainer'; //FIX
import { getPostsIdComments, deleteCommentsId } from '../utils/api';
//import { getCategoryPosts } from '../utils/api';
import { syncComments } from '../actions';
import { NavLink } from 'react-router-dom';
//import { postPostsId } from '../utils/api';

// const getAppropriatePost = (mergePosts, match) => {
//   if (match && match.params && match.params.categoryStr) {
//     getCategoryPosts(match.params.categoryStr).then(posts => {
//       console.log(
//         'PostListContainer componentDidMount posts :' +
//           JSON.stringify(posts, null, 4)
//       );
//       mergePosts(posts);
//     });
//   } else {
//     getPosts().then(posts => {
//       console.log(
//         'PostListContainer componentDidMount posts :' +
//           JSON.stringify(posts, null, 4)
//       );
//       mergePosts(posts);
//     });
//   }
// };
const getAppropriateComment = (postId, mergeComments) => {
  getPostsIdComments(postId).then(comments => {
    console.log(
      'CommentListContainer componentDidMount comments :' +
        JSON.stringify(comments, null, 4)
    );
    mergeComments(comments);
  });
};

class CommentListContainer extends React.Component {
  componentDidMount() {
    const { postId, mergeComments } = this.props;

    console.log(
      'CommentListContainer componentDidMount postId' +
        JSON.stringify(postId, null, 4)
    );
    getAppropriateComment(postId, mergeComments);
  }
  // componentDidUpdate(prevProps) {
  //   const { postId, mergeComments } = this.props;

  //   console.log(
  //     'CommentListContainer componentDidUpdate ' +
  //       JSON.stringify(prevProps, null, 4)
  //   );
  //   console.log(
  //     'CommentListContainer componentDidUpdate ' +
  //       JSON.stringify(this.props, null, 4)
  //   );
  //   if (
  //     prevProps.match &&
  //     this.props.match &&
  //     prevProps.match.params.categoryStr !== this.props.match.params.categoryStr
  //   ) {
  //     getAppropriateComment(postId, mergeComments);
  //   }
  // }

  handleUpVote = () => {};
  // handleUpVote = post => {
  //   const { mergePosts } = this.props;
  //   console.log(
  //     'PostListContainer handleUpVote event' + JSON.stringify(post, null, 4)
  //   );

  //   const currVoteScore = post.voteScore;
  //   mergePosts([{ ...post, voteScore: currVoteScore + 1 }]);
  //   postPostsId(post.id, 'upVote').then(post => {
  //     mergePosts([post]);
  //   });
  // };

  handleDownVote = () => {};
  // handleDownVote = post => {
  //   const { mergePosts } = this.props;
  //   console.log(
  //     'PostListContainer handleDownVote event' + JSON.stringify(post, null, 4)
  //   );

  //   const currVoteScore = post.voteScore;
  //   mergePosts([{ ...post, voteScore: currVoteScore - 1 }]);
  //   postPostsId(post.id, 'downVote').then(post => {
  //     mergePosts([post]);
  //   });
  // };
  handleDelete = comment => {
    const { mergeComments } = this.props;

    console.log('CommentDetailsContainer handleDelete');

    mergeComments([{ ...comment, deleted: true, timestamp: Date.now() }]);
    deleteCommentsId(comment.id);
  };
  render() {
    const { comments } = this.props;
    console.log(
      'CommentListContainer render comments:' +
        JSON.stringify(comments, null, 4)
    );

    return (
      <div>
        <NavLink to="/postedit">New Post</NavLink>
        <CommentSortOrderChangerContainer />
        <CommentList
          comments={comments}
          onUpVote={this.handleUpVote}
          onDownVote={this.handleDownVote}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

CommentListContainer.propTypes = {
  match: PropTypes.object, // from route??
  postId: PropTypes.string,
  comments: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  console.log(
    'CommentListContainer ownProps' + JSON.stringify(ownProps, null, 4)
  );
  // const categoryStr = ownProps.match.params.categoryStr
  //   ? ownProps.match.params.categoryStr
  //   : '';
  // console.log(
  //   'PostListContainer categoryStr' + JSON.stringify(categoryStr, null, 4)
  // );
  console.log(
    'CommentListContainer state.comments' +
      JSON.stringify(state.comments, null, 4)
  );
  return {
    comments: Object.values(state.comments)
      .filter(comment => comment.parentId === ownProps.postId)
      .filter(comment => !comment.deleted)
      .filter(comment => !comment.parentDeleted)
      .sort(state.commentSortOrder.func), // when all the sorting and deleting going to happen TODO
  };
};

const mapDispatchToProps = dispatch => ({
  mergeComments: data => dispatch(syncComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentListContainer
);
