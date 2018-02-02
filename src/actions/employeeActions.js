import axios from 'axios';

export const TYPES = {
  EMPLOYEE_REQUEST: 'EMPLOYEE_REQUEST',
  EMPLOYEE_LIST: 'EMPLOYEE_LIST',
  EMPLOYEE_LIST_SUCCESS: 'EMPLOYEE_LIST_SUCCESS',
  EMPLOYEE_LIST_FAIL: 'EMPLOYEE_LIST_FAIL',

  EMPLOYEE_SELECT: 'EMPLOYEE_SELECT',

  EMPLOYEE_GET_ONE: 'EMPLOYEE_GET_ONE',
  EMPLOYEE_GET_ONE_SUCCESS: 'EMPLOYEE_GET_ONE_SUCCESS',
  EMPLOYEE_GET_ONE_FAIL: 'EMPLOYEE_GET_ONE_FAIL',

  EMPLOYEE_SAVE: 'EMPLOYEE_SAVE',
  EMPLOYEE_SAVE_SUCCESS: 'EMPLOYEE_SAVE_SUCCESS',
  EMPLOYEE_SAVE_FAIL: 'EMPLOYEE_SAVE_FAIL',

  EMPLOYEE_REMOVE: 'EMPLOYEE_REMOVE',
  EMPLOYEE_REMOVE_SUCCESS: 'EMPLOYEE_REMOVE_SUCCESS',
  EMPLOYEE_REMOVE_FAIL: 'EMPLOYEE_REMOVE_FAIL',

  EMPLOYEE_REMOVE_AND_RELOAD: 'EMPLOYEE_REMOVE_AND_RELOAD',
  EMPLOYEE_SAVE_AND_RELOAD: 'EMPLOYEE_SAVE_AND_RELOAD',
};

const API_ROOT = '/api/employee';

export const requestEmployee = () => ({ type: TYPES.EMPLOYEE_REQUEST });
export const listEmployeesSuccess = employees => ({
  type: TYPES.EMPLOYEE_LIST_SUCCESS,
  payload: employees,
});
export const listEmployeesFail = err => ({
  type: TYPES.EMPLOYEE_LIST_FAIL,
  payload: err,
});

export const getEmployeeSuccess = employee => ({
  type: TYPES.EMPLOYEE_GET_ONE_SUCCESS,
  payload: employee,
});
export const getEmployeeFail = err => ({
  type: TYPES.EMPLOYEE_GET_ONE_FAIL,
  payload: err,
});

export const saveEmployeeSuccess = () => ({
  type: TYPES.EMPLOYEE_SAVE_SUCCESS,
});
export const saveEmployeeFail = err => ({
  type: TYPES.EMPLOYEE_SAVE_FAIL,
  payload: err,
});

export const removeEmployeeSuccess = () => ({
  type: TYPES.EMPLOYEE_REMOVE_SUCCESS,
});
export const removeEmployeeFail = err => ({
  type: TYPES.EMPLOYEE_REMOVE_FAIL,
  payload: err,
});

export const listEmployees = () => {
  return function(dispatch) {
    dispatch(requestEmployee());
    axios
      .get(API_ROOT)
      .then(response => dispatch(listEmployeesSuccess(response.data.data)))
      .catch(err => dispatch(listEmployeesFail(err)));
  };
};

export const getEmployee = id => {
  return function(dispatch) {
    dispatch(requestEmployee());
    axios
      .get(`${API_ROOT}/${id}`)
      .then(response => dispatch(getEmployeeSuccess(response.data.data)))
      .catch(err => dispatch(getEmployeeFail(err)));
  };
};

export const saveEmployee = (employee, onSuccess) => {
  return function(dispatch) {
    dispatch(requestEmployee());
    axios
      .post(`${API_ROOT}`, employee)
      .then(response => {
        dispatch(saveEmployeeSuccess(response.data.data));
        if (onSuccess) onSuccess(response.data.data);
      })
      .catch(err => dispatch(saveEmployeeFail(err)));
  };
};

export const removeEmployee = (id, onSuccess) => {
  return function(dispatch) {
    dispatch(requestEmployee());
    axios
      .delete(`${API_ROOT}/${id}`)
      .then(response => {
        dispatch(removeEmployeeSuccess(response.data.data));
        console.log({onSuccess});
        if (onSuccess) onSuccess(response.data.data);
      })
      .catch(err => dispatch(removeEmployeeFail(err)));
  };
};

// export const removeEmployee = createAction(TYPES.EMPLOYEE_REMOVE, code => ({
//   code,
// }));
