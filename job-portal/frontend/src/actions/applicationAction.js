

import {
    GET_ALL_CANDIDATE_SUCCESS,
    GET_ALL_CANDIDATE_ERROR,
    APPLY_JOB_SUCCESS,
    APPLY_JOB_ERROR
  } from "./actionTypes";
  import Axios from "axios";

  export const applyJob = (jobId) => {
    return async (dispatch) => {
      try {

        const result = await Axios(                                                                                                                                                                                                                                                   
          {                                                                                                                                                                                                                                                        
          method:'post',                                                                                                                                                                                                                                          
          url:`http://localhost:8000/application/apply`,                                                                                                                                                                            
          headers:{                                                                                                                                                                                                                                              
          Authorization: `Beaver ${localStorage.getItem('token')}` || null,
          "X-JOBID" : jobId,                                                                                                                                                                                                           
          }                                                                                                                                                                                                                                                      
          }); 
        
        dispatch({ type: APPLY_JOB_SUCCESS, payload: result.data});
      } catch (error) {
        console.log(error.response);
        dispatch({ type: APPLY_JOB_ERROR, error });
      }
    };
  };

  export const showCandidate = (jobId)=>{
  return async (dispatch) => {
    try{
      // console.log("heyhey");
      const result = await Axios.get("application/detail/" + jobId
      ,
      {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('token')}` 
        }
      }
    );
    console.log("candidate",result.data);
      dispatch({ type: GET_ALL_CANDIDATE_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_ALL_CANDIDATE_ERROR, error });
    }
  };
};


export const showAppliedJob = ()=>{
  return async (dispatch) => {
    try{
      // console.log("heyhey");
      const result = await Axios.get("application/applied"
      ,
      {
        headers: {
          'Authorization': `Beaver ${localStorage.getItem('token')}` 
        }
      }
    );
    console.log(result.data);
      dispatch({ type: GET_ALL_CANDIDATE_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_ALL_CANDIDATE_ERROR, error });
    }
  };
};
