//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import InvalidResource from './InvalidResource';

import { renderField, required } from '../utils/shared';

let PostFormEdit = props => {
  const { handleSubmit, initialValues, pristine, submitting } = props;
  if (!initialValues) {
    return <div>Loading...</div>;
  }
  if (initialValues.timestamp === 0) {
    return <InvalidResource />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={renderField}
        type="text"
        label="Title"
        validate={[required]}
      />

      <Field
        name="body"
        component={renderField}
        type="text"
        label="Body"
        validate={[required]}
      />

      <Field
        name="category"
        component={renderField}
        type="hidden"
        label=""
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

PostFormEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object, // might be missing before parents talk with server
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

PostFormEdit = reduxForm({
  form: 'postFormEdit', // a unique identifier for this form
})(PostFormEdit);

const mapStateToProps = ({ posts }, { postId }) => {
  return {
    initialValues: posts[postId],
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostFormEdit);
