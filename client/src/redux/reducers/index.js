import { combineReducers } from "redux";
import mealReducer from "./mealReducer";
import authReducer from "./authReducer";

export default combineReducers({ meals: mealReducer, auth: authReducer });
