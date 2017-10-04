import {TYPES} from '../actions/projectsActions';
import {createReducer} from 'reduxsauce';
// import { Types as ReduxSauceTypes } from 'reduxsauce';

// the initial state of this reducer
export const INITIAL_STATE = {
  all: [],
  isFetching: false,
};

export const HANDLERS = {
  [TYPES.PROJECT_GET_ALL]: (state = INITIAL_STATE, {type, payload, meta}) => {
    return Object.assign({}, state, {isFetching: true})
  },
  [TYPES.PROJECT_GET_ALL_SUCCESS]: (state = INITIAL_STATE, {type, payload, meta}) => {
    // return [{name: "Projeto-1"}, {name: "Projeto-2"}, {name: "Projeto-3"},]
    return {
      all: payload.data.data,
      isFetching: false,
    }
  },
  //If you need to process non listed actions
  // [ReduxSauceTypes.DEFAULT]: (state = INITIAL_STATE)=> state
};


export default createReducer(INITIAL_STATE, HANDLERS);