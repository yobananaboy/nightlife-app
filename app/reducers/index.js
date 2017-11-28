import { combineReducers } from 'redux';
import { barsHaveErrored, barsAreLoading, bars, user } from './bars';

export default combineReducers({
   barsHaveErrored,
   barsAreLoading,
   bars,
   user
});