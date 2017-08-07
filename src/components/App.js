import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../utils/api';
import { syncCategories } from '../actions';
import './../App.css';

class App extends React.Component {
  componentDidMount() {
    const { setCategories } = this.props;
    console.log('fluf');
    getCategories().then(categories => {
      console.log('pre sync ');
      console.log('categories :' + JSON.stringify(categories, null, 4));
      setCategories(categories);
      console.log('post sync');
    });
  }
  render() {
    const { dummy } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <h2>
            Welcome {dummy[0]}
          </h2>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

const mapDispatchToProps = dispatch => ({
  setCategories: data => dispatch(syncCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
