const TYPES = {
  'PROJECT_GET_ALL':'PROJECT_GET_ALL'
};

const actions = {
  'getAllProjects':()=>{
    return {
      'type': TYPES.PROJECT_GET_ALL
    }
  }
};

export {actions, TYPES};