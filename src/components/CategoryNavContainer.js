import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryLink from './CategoryLink';
import { getCategories } from '../utils/api';
import { syncCategories } from '../actions';

class CategoryNavContainer extends React.Component {
  componentDidMount() {
    const { categories, setCategories } = this.props;
    if (Object.keys(categories).length === 0) {
      getCategories().then(returnedCategories => {
        setCategories(returnedCategories);
      });
    }
  }
  render() {
    const { categories } = this.props;

    return (
      <div>
        {Object.values(categories).map(element =>
          <CategoryLink key={element.name} category={element.name}>
            {element.name}
          </CategoryLink>
        )}
      </div>
    );
  }
}

CategoryNavContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryNavContainer
);
