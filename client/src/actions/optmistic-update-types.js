// const LOAD = '';//Don't use suffix for initial action
const SEPARATOR = "_";
const SUCCESS = SEPARATOR+"SUCCESS";
const FAIL = SEPARATOR+"FAIL";

const asSuccess = (action)=>action+SUCCESS;
const asFail = (action)=>action+FAIL;


export {SUCCESS, FAIL, asSuccess, asFail}