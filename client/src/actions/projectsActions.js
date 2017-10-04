import axios from 'axios';
import {SUCCESS, FAIL} from './optmistic-update-types';
import {createTypes} from 'reduxsauce';

let TYPES = createTypes(`
  PROJECT_GET_ALL
  PROJECT_GET_ALL${SUCCESS}
  PROJECT_GET_ALL${FAIL}
  PROJECT_SELECT
  PROJECT_GET_ONE
  PROJECT_GET_ONE${SUCCESS}
  PROJECT_GET_ONE${FAIL}
  PROJECT_SAVE
  PROJECT_SAVE${SUCCESS}
  PROJECT_SAVE${FAIL}
`,
  {});

const actions = {
  'getAllProjects': () => {
    //using axios middleware with default client
    return {
      type: TYPES.PROJECT_GET_ALL,
      payload: {
        request: {
          url: '/api/project/all'
        }
      }
    }
  },
  // If you want to use promise-middleware with axios, you can. You just have to remove the request property
  'getProjectByCode': (code) => {
    return {
      type: TYPES.PROJECT_GET_ONE,
      payload: {
        promise: axios.get('/api/project/findByCode/' + code).then((r) => {
          r._request = r.request;
          delete r.request;
          return r;
        })
      }
    }
  },
  'setSelectedProject': (project) => {
    return {
      type: TYPES.PROJECT_SELECT,
      payload: project
    }
  },
  'saveProject': (project) => {
    //using axios middleware with default client
    return {
      type: TYPES.PROJECT_SAVE,
      payload: {
        request: {
          method: 'post',
          url: '/api/project/save',
          data: project
        }
      }
    }
  }
};

export {actions, TYPES};