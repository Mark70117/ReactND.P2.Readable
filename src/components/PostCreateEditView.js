import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';

class PostCreateEditView extends React.Component {
  componentDidMount() {
    console.log('PostCreateEditView componentDidMount');
  }
  foobar(values) {
    console.log('PostCreateEditView handleSubmit' + JSON.stringify(values));
  }
  render() {
    const { dummy } = this.props;

    return (
      <div className="PostCreateEditView">
        <ul>
          <li>
            TODO should have a form to create new post or edit existing posts
          </li>
          <li>
            TODO when editing, existing data should be populated in the form
          </li>
        </ul>
        <PostForm onSubmit={this.foobar} />
      </div>
    );
  }
}

PostCreateEditView.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateEditView);
