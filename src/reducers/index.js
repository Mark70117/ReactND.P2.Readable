//https://egghead.io/courses/getting-started-with-redux
//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { combineReducers } from 'redux';
import dummy from './dummy';
import categories from './categories';

const rootReducer = combineReducers({
  dummy,
  categories,
});

export default rootReducer;
