import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryLink from './CategoryLink';

class CategoryNavContainer extends React.Component {
  componentDidMount() {
    console.log('CategoryNavContainer componentDidMount');
  }
  render() {
    const { dummy, categories } = this.props;
    console.log(
      'CategoryNavContainer categories:' + JSON.stringify(categories, null, 4)
    );

    return (
      <div>
        {Object.values(categories).map(element =>
          <CategoryLink category={element.name}>
            {element.name}
          </CategoryLink>
        )}
      </div>
    );
  }
}

CategoryNavContainer.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  //setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryNavContainer
);
