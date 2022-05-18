import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";

const rootReduxer = combineReducers({
  error,
  auth,
});

export default rootReduxer;
