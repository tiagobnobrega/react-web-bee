import {TYPES} from '../actions/projectsActions';

const initialState = {
  all:[],
  isFetching: false,
};

export default function reducer(state = initialState, {type, payload, meta}) {
  const actionType = type || "DEFAULT";
  console.log("Action:",{type, payload, meta});
  const handlers = {
    [TYPES.PROJECT_GET_ALL]:()=>{
      return Object.assign({},state,{isFetching:true})
    },
    [TYPES.PROJECT_GET_ALL_SUCCESS]: () => {
      // return [{name: "Projeto-1"}, {name: "Projeto-2"}, {name: "Projeto-3"},]
      return {
        all: payload.data.data,
        isFetching: false,
      }
    },
    "DEFAULT": () => state
  };

  const handler = handlers[actionType] || handlers["DEFAULT"];
  return handler();
};

