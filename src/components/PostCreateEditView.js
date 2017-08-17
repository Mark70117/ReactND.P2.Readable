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
  static propTypes = {
    categories: PropTypes.array.isRequired,
    changePost: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    mergePosts: PropTypes.func.isRequired,
    postId: PropTypes.string,
    setCategories: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { categories, setCategories } = this.props;
    if (Object.keys(categories).length === 0) {
      getCategories().then(returnedCategories => {
        setCategories(returnedCategories);
      });
    }
  }

  add = values => {
    const { createPost, mergePosts, history } = this.props;

    const theUUID = uuid.v4();
    const post = {
      id: theUUID,
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
      author: values.author,
      category: values.category,
    };
    createPost(post);
    postPosts(post).then(resultPost => {
      mergePosts([resultPost]);
      history.push(`/${values.category}/${theUUID}`);
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
    const { postId } = this.props;

    return (
      <div className="PostCreateEditView">
        {postId
          ? <PostFormEdit postId={postId} onSubmit={this.edit} />
          : <PostFormAdd onSubmit={this.add} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postid = ownProps.match.params.postId;

  return {
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
