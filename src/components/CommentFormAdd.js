//http://redux-form.com/7.0.3/examples/initializeFromState/
// TODO http://redux-form.com/7.0.3/examples/syncValidation/

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { syncPosts } from '../actions';

let PostFormAdd = props => {
  const { categories, handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
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

// TOOO can alter submitting or some other prop to disabled until all have values?

PostFormAdd = reduxForm({
  form: 'postFormAdd', // a unique identifier for this form
})(PostFormAdd);

const mapStateToProps = (state, ownProps) => {
  console.log('PostFormAdd mapStateToProps');
  return {
    categories: state.categories,
    initialValues: { parentId: ownProps.parentId },
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFormAdd);
