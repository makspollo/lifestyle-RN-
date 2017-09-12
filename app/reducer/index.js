import { combineReducers } from 'redux';
import * as navReducer from './navigation';
import * as scroll from './scroll'

export default combineReducers(Object.assign(
  navReducer, scroll
));
