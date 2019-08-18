import { SET_CURRENT_MEAL, MEALS_LOADED } from "../actions/actionTypes";

const initialState = {
  currentMeal: null,
  meals: []
};

export default function mealReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_MEAL:
      const selectedMeal =
        state.meals.find(meal => meal._id === payload) || null;
      return { ...state, currentMeal: selectedMeal };
    case MEALS_LOADED:
      return {
        ...state,
        meals: payload
      };
    default:
      return state;
  }
}
