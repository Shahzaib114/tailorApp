import {combineReducers} from '@reduxjs/toolkit';
import appData from '../reducers/appReducer';

const rootReducer = combineReducers({
  appData,
});

export default rootReducer;
