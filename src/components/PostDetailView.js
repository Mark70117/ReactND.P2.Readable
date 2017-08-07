import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostDetailView extends React.Component {
  componentDidMount() {
    console.log('PostDetailView componentDidMount');
  }
  render() {
    const { dummy } = this.props;

    return (
      <div className="PostDetailView">
        <ul>
          <li>
            TODO should show the details of a post, including: Title, Body,
            Author, timestamp (in user readable format), and vote score
          </li>
          <li>
            TODO should list all of the comments for that post, ordered by
            voteScore (highest first)
          </li>
          <li>
            TODO should have a control for reordering comments by score or
            timestamp
          </li>
          <li>TODO should have controls to edit or delete the post</li>
          <li>TODO should have a control to add a new comment.</li>
          <li>
            TODO implement comment form however you want (inline, modal, etc.)
          </li>
          <li>
            TODO comments should also have controls for editing or deleting
          </li>
        </ul>
      </div>
    );
  }
}

PostDetailView.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
