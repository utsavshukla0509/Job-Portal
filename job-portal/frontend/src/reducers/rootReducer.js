import { combineReducers } from "redux";
import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import applicationReducer from "./applictionReducer"

export default combineReducers({
  auth : authReducer,
  job : jobReducer,
  application : applicationReducer,
});
