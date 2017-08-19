//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import InvalidResource from './InvalidResource';

import { renderField, required } from '../utils/shared';

let CommentFormAdd = props => {
  const { category, handleSubmit, post, pristine, submitting } = props;
  if (!post) {
    return <div>Loading...</div>;
  }
  if (post.timestamp === 0) {
    return <InvalidResource />;
  }
  if (post.category !== category) {
    return <InvalidResource />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="body"
        type="text"
        component={renderField}
        label="Body"
        validate={[required]}
      />
      <Field
        name="author"
        type="text"
        component={renderField}
        label="Author"
        validate={[required]}
      />
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

CommentFormAdd.propTypes = {
  category: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  post: PropTypes.object,
};

CommentFormAdd = reduxForm({
  form: 'commentFormAdd', // a unique identifier for this form
})(CommentFormAdd);

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: { parentId: ownProps.parentId },
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormAdd);
