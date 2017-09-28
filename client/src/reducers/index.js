import { routerReducer } from 'react-router-redux'
import projectsReducer from './projectsReducer';
import { combineReducers } from 'redux';

const reducers = {
  routing: routerReducer,
  projects: projectsReducer,
};
export default combineReducers(reducers);