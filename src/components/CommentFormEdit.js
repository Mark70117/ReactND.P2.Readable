//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import InvalidResource from './InvalidResource';

let CommentFormEdit = props => {
  const {
    category,
    handleSubmit,
    initialValues,
    pristine,
    submitting,
    parentId,
    post,
  } = props;
  if (!initialValues || !post) {
    return <div>Loading...</div>;
  }
  if (initialValues.parentId !== parentId) {
    return <InvalidResource />;
  }
  if (post.timestamp === 0) {
    return <InvalidResource />;
  }
  if (post.category !== category) {
    return <InvalidResource />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Body</label>
        <div>
          <Field name="body" component="input" type="text" placeholder="Body" />
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

CommentFormEdit.propTypes = {
  category: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  post: PropTypes.object,
};

CommentFormEdit = reduxForm({
  form: 'commentFormEdit', // a unique identifier for this form
})(CommentFormEdit);

const mapStateToProps = ({ comments }, { commentId }) => {
  return {
    initialValues: comments[commentId],
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormEdit);
