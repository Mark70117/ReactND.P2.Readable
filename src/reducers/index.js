//https://egghead.io/courses/getting-started-with-redux
//https://egghead.io/courses/building-react-applications-with-idiomatic-redux

import { combineReducers } from 'redux';
import dummy from './dummy';

const rootReducer = combineReducers({
  dummy,
});

export default rootReducer;
