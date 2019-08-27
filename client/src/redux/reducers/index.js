import { combineReducers } from "redux";
import mealReducer from "./mealReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  meal: mealReducer,
  auth: authReducer,
  alerts: alertReducer
});
