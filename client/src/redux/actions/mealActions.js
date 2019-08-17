import { SET_CURRENT_MEAL } from "./actionTypes";

export const setCurrentMeal = meal => {
  return { type: SET_CURRENT_MEAL, payload: meal };
};
