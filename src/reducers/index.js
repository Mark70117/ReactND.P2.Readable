//https://egghead.io/courses/getting-started-with-redux
//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { combineReducers } from 'redux';
import dummy from './dummy';
import categories from './categories';
import posts from './posts';

const rootReducer = combineReducers({
  dummy,
  categories,
  posts,
});

export default rootReducer;
