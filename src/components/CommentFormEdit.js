//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let CommentFormEdit = props => {
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
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

CommentFormEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

CommentFormEdit = reduxForm({
  form: 'commentFormEdit', // a unique identifier for this form
})(CommentFormEdit);

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.comments[ownProps.commentId],
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormEdit);
