import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetailsContainer from './PostDetailsContainer';

class PostDetailView extends React.Component {
  render() {
    const { dummy, match } = this.props;

    return (
      <div className="PostDetailView">
        <PostDetailsContainer postId={match.params.postId} />
      </div>
    );
  }
}

PostDetailView.propTypes = {
  dummy: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
