import {TYPES} from '../actions/projectsActions';

export default function projectsReducer(state = [], action) {
  const actionType = action.type || "DEFAULT";
  const handlers = {
    [TYPES.PROJECT_GET_ALL]: () => {
      return [{name: "Projeto-1"}, {name: "Projeto-2"}, {name: "Projeto-3"},]
    },
    "DEFAULT": () => state
  };

  const handler = handlers[actionType] || handlers["DEFAULT"];
  return handler();
};