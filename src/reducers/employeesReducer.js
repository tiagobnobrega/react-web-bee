import { TYPES } from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

// the initial state of this reducer
export const INITIAL_STATE = {
  data: [],
  one: {},
  isFetching: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.EMPLOYEE_REQUEST: {
      return { ...state, isFetching: true };
    }
    case TYPES.EMPLOYEE_LIST_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    }
    case TYPES.EMPLOYEE_GET_ONE_SUCCESS: {
      return {
        ...state,
        one: action.payload[0],
        isFetching: false,
      };
    }
    case TYPES.EMPLOYEE_REMOVE_SUCCESS: {
      return {
        ...state,
        one: {},
        isFetching: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
