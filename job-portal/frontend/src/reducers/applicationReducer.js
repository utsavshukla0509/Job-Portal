import {
    GET_ALL_CANDIDATE_SUCCESS,
    GET_ALL_CANDIDATE_ERROR,
  } from "../actions/actionTypes";
  
  const initState = {
    loggedIn: (localStorage.getItem('loggedIn')==='true') || false,
    authMessage: null,
    candidateData:undefined,
    status : false,
    isVerify : false
  };
  
  export default function (state = initState, action) {
    switch (action.type) {
  
        case GET_ALL_CANDIDATE_SUCCESS:
        return {
          ...state,
          candidateData: action.payload.candidateData,
        };
      case GET_ALL_CANDIDATE_ERROR:
        return {
          ...state,
          authMessage: action.error.response.data.msg,
        };
  
      default:
        return state;
    }
  }
  