import axios from 'axios';
import {createAction} from 'redux-actions';

const TYPES = {
  'PROJECT_GET_ALL': `PROJECT_GET_ALL`,
  'PROJECT_GET_ALL_SUCCESS': `PROJECT_GET_ALL_SUCCESS`,
  'PROJECT_GET_ALL_FAIL': `PROJECT_GET_ALL_SUCCESS`,
  'PROJECT_SELECT': `PROJECT_SELECT`,
  'PROJECT_GET_ONE': `PROJECT_GET_ONE`,
  'PROJECT_GET_ONE_SUCCESS': `PROJECT_GET_ONE_SUCCESS`,
  'PROJECT_GET_ONE_FAIL': `PROJECT_GET_ONE_FAIL`,
  'PROJECT_SAVE': `PROJECT_SAVE`,
  'PROJECT_SAVE_SUCCESS': `PROJECT_SAVE_SUCCESS`,
  'PROJECT_SAVE_FAIL': `PROJECT_SAVE_FAIL`,
};


const actions = {
  'getAllProjects': createAction(TYPES.PROJECT_GET_ALL, () => {
    return {
      request: {
        url: '/api/project/all'
      }
    }
  }),
  'getProjectByCode': createAction(TYPES.PROJECT_GET_ONE, (code) => {
    return {
            promise: axios.get('/api/project/findByCode/' + code).then((r) => {
              r._request = r.request;
              delete r.request;
              return r;
            })
          }
  }),

  'setSelectedProject': createAction(TYPES.PROJECT_SELECT,project=>project),
  'saveProject': createAction(TYPES.PROJECT_SAVE, (project) => {
    return {
      request: {
        method: 'post',
        url: '/api/project/save',
        data: project
      }
    }
  }),
};

console.log('projectActions', actions.getAllProjects());

export {actions, TYPES};
