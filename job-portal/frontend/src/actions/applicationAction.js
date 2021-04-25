

import {
    GET_ALL_CANDIDATE_SUCCESS,
    GET_ALL_CANDIDATE_ERROR,
  } from "./actionTypes";
  import Axios from "axios";

//   export const postJob = (jobDetail) => {
//     return async (dispatch) => {
//       try {
//         const result = await Axios.post("/job/newjob", jobDetail);
        
//         dispatch({ type: POST_JOB_SUCCESS, payload: result.data});
//       } catch (error) {
//         // console.log(error.response);
//         dispatch({ type: POST_JOB_ERROR, error });
//       }
//     };
//   };


  export const showCandidate = (jobId)=>{
  return async (dispatch) => {
    try{
      // console.log("heyhey");
      const result = await Axios.get("application/detail/" + "1"
    //   ,
    //   {
    //     headers: {
    //       'Authorization': `Beaver ${localStorage.getItem('name')}` 
    //     }
    //   }
    );
    
      dispatch({ type: GET_ALL_CANDIDATE_SUCCESS, payload: result.data });
    }
    catch(error){
      dispatch({ type: GET_ALL_CANDIDATE_ERROR, error });
    }
  };
};
