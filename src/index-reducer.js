import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import employeeReducer from './employees/_reducer';

const reducers = {
  routing: routerReducer,
  employees: employeeReducer,
};

export default combineReducers(reducers);
