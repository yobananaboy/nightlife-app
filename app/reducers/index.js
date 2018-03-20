import { combineReducers } from 'redux';
import { barsHaveErrored, barsAreLoading, bars } from './bars';
import { user } from './user';

export default combineReducers({
   barsHaveErrored,
   barsAreLoading,
   bars,
   user
});