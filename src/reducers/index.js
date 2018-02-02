import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

import employeeReducer from './employeesReducer';

const reducers = {
  routing: routerReducer,
  employees: employeeReducer,
};
export default combineReducers(reducers);
