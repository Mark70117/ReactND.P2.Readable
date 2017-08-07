//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { createStore } from 'redux';
import readableApp from './reducers';

const configureStore = () => {
  const store = createStore(
    readableApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configureStore;
