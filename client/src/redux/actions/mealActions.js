import {
  SET_CURRENT_MEAL,
  MEALS_LOADED,
  NEW_MEAL_ADDED,
  SET_CURRENT_VIEW,
  CLEAR_CURRENT_MEAL,
  MEAL_DELETED
} from "./actionTypes";
import axios from "axios";

export const setCurrentMeal = id => async dispatch => {
  dispatch({ type: SET_CURRENT_MEAL, payload: id });
  dispatch({ type: SET_CURRENT_VIEW, payload: "Info" });
};

export const setCurrentView = view => async dispatch => {
  if (view !== "Info") dispatch({ type: CLEAR_CURRENT_MEAL });
  dispatch({ type: SET_CURRENT_VIEW, payload: view });
};

export const loadMeals = () => async dispatch => {
  try {
    const res = await axios.get("/api/meals/me");
    dispatch({ type: MEALS_LOADED, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};

export const addMeal = meal => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };
    const body = JSON.stringify(meal);
    const res = await axios.post("/api/meals", body, config);
    dispatch({ type: NEW_MEAL_ADDED, payload: res.data });
    dispatch({ type: SET_CURRENT_VIEW, payload: "Info" });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};

export const deleteMeal = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/meals/${id}`);
    dispatch({ type: MEAL_DELETED, payload: res.data });
    dispatch({ type: SET_CURRENT_VIEW, payload: "info" });
  } catch (error) {}
};
