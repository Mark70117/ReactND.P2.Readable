//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let CommentFormAdd = props => {
  const { handleSubmit, pristine, submitting } = props;
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

CommentFormAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
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
