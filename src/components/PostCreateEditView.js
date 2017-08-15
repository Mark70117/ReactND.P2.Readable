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
    console.log('PostCreateEditView componentDidMount');
    const { setCategories } = this.props;
    if (Object.keys(this.props.categories).length === 0) {
      getCategories().then(categories => {
        console.log('categories :' + JSON.stringify(categories, null, 4));
        setCategories(categories);
      });
    }
  }
  //TODO ?move getCategories to root?

  add = values => {
    const { mergePosts, history, postId } = this.props;

    console.log('PostCreateEditView add' + JSON.stringify(values, null, 4));
    const theUUID = uuid.v4();
    const post = {
      id: theUUID,
      timestamp: Date.now(),
      title: values.title ? values.title : '',
      body: values.body ? values.body : '',
      author: values.author ? values.author : '',
      category: values.category ? values.category : '',
    };
    console.log('PostCreateEditView add post' + JSON.stringify(post, null, 4));
    addPost(post);
    postPosts(post).then(resultPost => {
      console.log(
        'PostCreateEditView add resultPost' +
          JSON.stringify(resultPost, null, 4)
      );
      mergePosts([resultPost]);
      history.push(`/postdetails/${theUUID}`);
    });
  };
  edit = values => {
    const { mergePosts, history, postId } = this.props;

    console.log('PostCreateEditView edit' + JSON.stringify(values, null, 4));
    const post = {
      id: values.id,
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
    };
    console.log('PostCreateEditView edit post' + JSON.stringify(post, null, 4));
    editPost(post);
    putPostsId(post).then(resultPost => {
      console.log(
        'PostCreateEditView edit resultPost' +
          JSON.stringify(resultPost, null, 4)
      );
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
  console.log(
    'PostCreateEditView mapStateToProps' + JSON.stringify(ownProps, null, 4)
  );
  const postid = ownProps.match.params.postId;
  console.log(
    'PostCreateEditView mapStateToProps postId' +
      JSON.stringify(postid, null, 4)
  );
  return {
    dummy: state.dummy,
    postId: postid,
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateEditView);
