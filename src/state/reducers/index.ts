import { combineReducers } from '@reduxjs/toolkit';
import connection from './connection';

const rootReducer = combineReducers({
  connection,
});

export default rootReducer;
