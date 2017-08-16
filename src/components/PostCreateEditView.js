import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'js-uuid';
import PostFormEdit from './PostFormEdit';
import PostFormAdd from './PostFormAdd';
import { putPostsId, postPosts } from '../utils/api';
import { syncPosts, editPost, addPost } from '../actions';
import { getCategories } from '../utils/api';
import { syncCategories } from '../actions';

class PostCreateEditView extends React.Component {
  componentDidMount() {
    const { setCategories } = this.props;
    if (Object.keys(this.props.categories).length === 0) {
      getCategories().then(categories => {
        setCategories(categories);
      });
    }
  }

  add = values => {
    const { createPost, mergePosts, history } = this.props;

    const theUUID = uuid.v4();
    const post = {
      id: theUUID,
      timestamp: Date.now(),
      title: values.title ? values.title : '',
      body: values.body ? values.body : '',
      author: values.author ? values.author : '',
      category: values.category ? values.category : '',
    };
    createPost(post);
    postPosts(post).then(resultPost => {
      mergePosts([resultPost]);
      history.push(`/postdetails/${theUUID}`);
    });
  };
  edit = values => {
    const { changePost, mergePosts, history, postId } = this.props;

    const post = {
      id: values.id,
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
    };
    changePost(post);
    putPostsId(post).then(resultPost => {
      mergePosts([resultPost]);
      history.push(`/postdetails/${postId}`);
    });
  };
  render() {
    const { dummy, postId } = this.props;

    return (
      <div className="PostCreateEditView">
        {postId
          ? <PostFormEdit postId={postId} onSubmit={this.edit} />
          : <PostFormAdd onSubmit={this.add} />}
      </div>
    );
  }
}

PostCreateEditView.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const postid = ownProps.match.params.postId;

  return {
    dummy: state.dummy,
    postId: postid,
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
  createPost: data => dispatch(addPost(data)),
  changePost: data => dispatch(editPost(data)),
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateEditView);
