//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { createStore } from 'redux';
import readableApp from './reducers';

const configureStore = () => {
  const store = createStore(readableApp);
  return store;
};

export default configureStore;
