import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createAction } from 'redux-actions';
import board from './board/state';
import user from './user/state';
import configuration from './configuration/state';
import app from './app/state';

export const INITIALISE = 'retrospected/initialise';
export const initialise = createAction(INITIALISE);

const rootReducer = combineReducers({
  board,
  user,
  configuration,
  app,
  routing: routerReducer,
});

export default rootReducer;
