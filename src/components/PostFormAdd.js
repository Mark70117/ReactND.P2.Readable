//http://redux-form.com/7.0.3/examples/initializeFromState/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { syncPosts } from '../actions';

//http://redux-form.com/6.4.3/examples/fieldLevelValidation/
const required = value => (value ? undefined : 'Required');
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;

let PostFormAdd = props => {
  const { categories, handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
        validate={[required]}
      />

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
        <label>Category</label>
        <div>
          {Object.values(categories).map(element =>
            <label key={element.name}>
              <Field
                name="category"
                component={renderField}
                type="radio"
                value={element.name}
                label={element.name}
                validate={[required]}
              />
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

PostFormAdd.propTypes = {
  categories: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

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
