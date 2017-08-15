//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { syncPosts } from '../actions';

let PostFormAdd = props => {
  const { categories, handleSubmit, pristine, submitting } = props;
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
        <label>Category</label>
        <div>
          {Object.values(categories).map(element =>
            <label>
              <Field
                key={element.name}
                name="category"
                component="input"
                type="radio"
                value={element.name}
              />{' '}
              {element.name}
            </label>
          )}
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
  return {
    categories: state.categories,
    initialValues: {},
  };
};

const mapDispatchToProps = dispatch => ({
  mergePosts: data => dispatch(syncPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFormAdd);
