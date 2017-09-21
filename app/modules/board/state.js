import { combineReducers } from 'redux';
import posts from './posts/state';
import session from './session/state';

const reducer = combineReducers({
  posts,
  session
});

export default reducer;
