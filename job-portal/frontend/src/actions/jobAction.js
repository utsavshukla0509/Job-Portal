import {
    POST_JOB_SUCCESS,
    POST_JOB_ERROR,
    GET_ALL_POST_JOB_SUCCESS,
    GET_ALL_POST_JOB_ERROR,
    GET_ALL_JOB_SUCCESS,
    GET_ALL_JOB_ERROR,
  } from "./actionTypes";
  import Axios from "axios";

  export const postJob = (jobDetail) => {
    return async (dispatch) => {
      try {
        const result = await Axios.post("/job/newjob", jobDetail,
        {
          headers: {
            'Authorization': `Beaver ${localStorage.getItem('token')}` 
          }
        });
        console.log(result);
        dispatch({ type: POST_JOB_SUCCESS, payload: result.data});
      } catch (error) {
        // console.log(error.response);
        dispatch({ type: POST_JOB_ERROR, error });
      }
    };
  };



  export const showJob = ()=>{
  return async (dispatch) => {
    try{
      // console.log("heyhey");
      const result = await Axios.get("/job/detail"
      ,
      {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('token')}` 
        }
      }
    );
    
      dispatch({ type: GET_ALL_POST_JOB_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_ALL_POST_JOB_ERROR, error });
    }
  };
};


export const showAllJob = ()=>{
  return async (dispatch) => {
    try{
      // console.log("heyhey");
      const result = await Axios.get("job/alljob/detail"
      ,
      {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('token')}` 
        }
      }
    );
    // console.log(result.data);
      dispatch({ type: GET_ALL_JOB_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_ALL_JOB_ERROR, error });
    }
  };
};

