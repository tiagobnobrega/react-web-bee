import { multiClientMiddleware } from 'redux-axios-middleware';
import axios from 'axios';
import {SUCCESS, FAIL} from '../actions/optmistic-update-types';
//reference at: https://github.com/svrcekmichal/redux-axios-middleware

const clients = {
default: {
  client: axios.create({
    baseURL:'',
    responseType: 'json'
  })
},
  // Add other clients here
  // googleMaps: {
  //   client: axios.create({
  //     baseURL:'https://maps.googleapis.com/maps/api',
  //     responseType: 'json'
  //   })
  // }
};

const options ={
  successSuffix:SUCCESS,
  errorSuffix: FAIL

  // interceptors: {
  //   request: [
  //     function ({getState, dispatch, getSourceAction}, req) {
  //       console.log(req); //contains information about request object
  //     }
  //   ],
  //   response: [
  //     function ({getState, dispatch, getSourceAction}, req) {
  //       console.log(req); //contains information about request object
  //       //...
  //     }
  //   ]
  // }
};


export default multiClientMiddleware(
  clients,
  options
);

