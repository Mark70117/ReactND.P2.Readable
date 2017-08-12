//https://egghead.io/courses/getting-started-with-redux
//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { combineReducers } from 'redux';
import dummy from './dummy';
import categories from './categories';
import posts from './posts';
import postSortOrder from './postSortOrder';

const rootReducer = combineReducers({
  dummy,
  categories,
  posts,
  postSortOrder,
});

export default rootReducer;
