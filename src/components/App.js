import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './../App.css';

const App = ({ dummy }) =>
  <div className="App">
    <div className="App-header">
      <h2>
        Welcome {dummy[0]}
      </h2>
    </div>
  </div>;

App.propTypes = {
  dummy: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  dummy: state.dummy,
});

export default connect(mapStateToProps)(App);
