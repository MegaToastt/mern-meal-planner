import { SET_CURRENT_MEAL, MEALS_LOADED } from "./actionTypes";
import axios from "axios";

export const setCurrentMeal = id => async dispatch => {
  dispatch({ type: SET_CURRENT_MEAL, payload: id });
};

export const loadMeals = () => async dispatch => {
  try {
    const res = await axios.get("/meals/me");
    dispatch({ type: MEALS_LOADED, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};
