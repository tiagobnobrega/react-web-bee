import {TYPES} from '../actions/projectsActions';

const initialState = {
  isFetchingLoad: false,
  isFetchingPost: false,
  isNew: false
};

export default function reducer(state = initialState, action) {
  const {type, payload, meta} = action;
  const actionType = type || "DEFAULT";
  const handlers = {
    [TYPES.PROJECT_GET_ONE]: () => {
      return Object.assign({}, state, {isFetchingLoad: true});
    },

    [TYPES.PROJECT_SELECT]: () => {
      return Object.assign({}, initialState, {...payload});
    },

    [TYPES.PROJECT_GET_ONE_SUCCESS]: () => {
      console.log(`action ${TYPES.PROJECT_GET_ONE_SUCCESS}:`, {type, payload, meta});
      const projectData = payload.data.data[0];
      return Object.assign({}, state, {
        isFetchingLoad: false,
        isNew: false,
        ...projectData,
      });
    },

    [TYPES.PROJECT_SAVE]: () => {
      return Object.assign({}, state, {isFetchingPost: true})
    },

    [TYPES.PROJECT_SAVE_SUCCESS]: () => {
      return Object.assign({}, state, {
        isFetchingPost: false,
      });
    },
    "DEFAULT": () => state
  };

  const handler = handlers[actionType] || handlers["DEFAULT"];
  return handler();
};

