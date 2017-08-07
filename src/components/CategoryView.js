import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CategoryView extends React.Component {
  componentDidMount() {
    console.log('CategoryView componentDidMount');
  }
  render() {
    const { dummy } = this.props;

    return (
      <div className="CategoryView">
        <ul>
          <li>
            identical to the default view, but filtered to only include post
            with the selected category  TODO
          </li>
        </ul>
      </div>
    );
  }
}

CategoryView.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
