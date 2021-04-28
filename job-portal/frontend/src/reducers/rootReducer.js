import { combineReducers } from "redux";
import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  auth : authReducer,
  job : jobReducer,
  application : applicationReducer,
});
