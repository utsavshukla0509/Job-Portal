import {
    POST_JOB_SUCCESS,
    POST_JOB_ERROR,
    GET_ALL_POST_JOB_SUCCESS,
    GET_ALL_POST_JOB_ERROR,
  } from "../actions/actionTypes";
  
  const initState = {
    loggedIn: (localStorage.getItem('loggedIn')==='true') || false,
    authMessage: null,
    jobData:undefined,
    status : false,
    isVerify : false
  };
  
  export default function (state = initState, action) {
    switch (action.type) {

      case POST_JOB_SUCCESS:
        return {
          ...state,
          status: action.payload.status,
          authMessage: action.payload.msg,
        };
  
      case POST_JOB_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
  
        case GET_ALL_POST_JOB_SUCCESS:
        return {
          ...state,
          jobData: action.payload.jobData,
        };
      case GET_ALL_POST_JOB_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
  
      default:
        return state;
    }
  }
  