import {TYPES} from '../actions/projectsActions';
import {handleActions} from 'redux-actions';

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
};


export default handleActions(HANDLERS,INITIAL_STATE);
