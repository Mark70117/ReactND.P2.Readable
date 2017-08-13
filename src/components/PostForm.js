//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { syncPosts } from '../actions';

let PostForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <div>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
      <div>
        <label>Body</label>
        <div>
          <Field name="body" component="input" type="text" placeholder="Body" />
        </div>
      </div>
      <div>
        <label>Author</label>
        <div>
          <Field
            name="author"
            component="input"
            type="text"
            placeholder="Author"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

PostForm = reduxForm({
  form: 'postForm', // a unique identifier for this form
})(PostForm);

const mapStateToProps = (state, ownProps) => {
  console.log(
    'PostForm mapStateToProps' +
      JSON.stringify(state.posts['6000000000000000002'], null, 4)
  );
  return { initialValues: state.posts['6000000000000000002'] };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
