import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNOUT,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_OTP_SUCCESS,
    GET_OTP_ERROR,
    // GET_USER_DETAIL_SUCCESS,
    // GET_USER_DETAIL_ERROR,
  } from "./actionTypes";
  import Axios from "axios";


  export const signIn = (credentials,role) => {
    return async (dispatch) => {
      try {
        // console.log(credentials);
        const result = await Axios.post("/user/signin/" + role, credentials);
        console.log(result);
        dispatch({ type: LOGIN_SUCCESS, payload: result.data});
      } catch (error) {
        // console.log(error.response);
        dispatch({ type: LOGIN_ERROR, error });
      }
    };
  };
  
  export const signUp = (credentials,role) => {
    return async (dispatch) => {
      try {
        // console.log("credentials");
        console.log(credentials); 
        const result = await Axios.post("/user/signup/" + role, credentials);
        console.log("hello",result);
        dispatch({ type: SIGNUP_SUCCESS, payload: result.data});
      } catch (error) {
        // console.log(error.response);
        dispatch({ type: SIGNUP_ERROR, error });
      }
    };
  };

  
  export const signOut = () => {
    return (dispatch) => {
    dispatch({ type: SIGNOUT });
  };
};

export const getOTP = (email,type,role) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post("/user/generateotp/" +type + "/" + role,{"email" : email});
      console.log(result); 
      dispatch({ type: GET_OTP_SUCCESS, payload: result.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_OTP_ERROR, error });
    }
  };
};


// export const userDetail = ()=>{
//   return async (dispatch) => {
//     try{
//       // console.log("heyhey");
//       const result = await Axios.get("/user/getdetail",{
//         headers: {
//           'Authorization': `Beaver ${localStorage.getItem('name')}` 
//         }
//       });
//       // console.log("getawait userdetail");
//       // console.log("hello",result); 
//       dispatch({ type: GET_USER_DETAIL_SUCCESS, payload: result.data });
//     }
//     catch(error){
//       dispatch({ type: GET_USER_DETAIL_ERROR, error });
//     }
//   };
// };
