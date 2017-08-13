//https://egghead.io/courses/getting-started-with-redux
//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dummy from './dummy';
import categories from './categories';
import posts from './posts';
import postSortOrder from './postSortOrder';

const rootReducer = combineReducers({
  dummy,
  categories,
  posts,
  postSortOrder,
  form: formReducer,
});

export default rootReducer;
