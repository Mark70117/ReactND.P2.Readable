import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryLink from './CategoryLink';
import { getCategories } from '../utils/api';
import { syncCategories } from '../actions';

class CategoryNavContainer extends React.Component {
  componentDidMount() {
    const { setCategories } = this.props;
    if (Object.keys(this.props.categories).length === 0) {
      getCategories().then(categories => {
        setCategories(categories);
      });
    }
  }
  render() {
    const { dummy, categories } = this.props;

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
  dummy: PropTypes.array.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryNavContainer
);
