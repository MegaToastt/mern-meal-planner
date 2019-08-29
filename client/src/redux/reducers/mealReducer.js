import {
  SET_CURRENT_MEAL,
  MEALS_LOADED,
  NEW_MEAL_ADDED,
  SET_CURRENT_VIEW,
  CLEAR_CURRENT_MEAL,
  LOGOUT,
  MEAL_DELETED,
  CURRENT_MEAL_EDITED,
  REGISTER_SUCCESS,
  INGREDIENTS_LOADED,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SET_SIDEBAR_VIEW
} from "../actions/actionTypes";

const initialState = {
  currentMeal: null,
  currentView: "Info",
  sidebarOpen: false,
  sidebarView: "",
  meals: [],
  ingredients: [],
  loading: true
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
        meals: payload,
        loading: false
      };
    case NEW_MEAL_ADDED:
      return {
        ...state,
        currentMeal: payload,
        meals: [...state.meals, payload],
        loading: false,
        sidebarOpen: false
      };
    case CURRENT_MEAL_EDITED:
      return {
        ...state,
        currentMeal: payload,
        meals: state.meals.map(meal =>
          meal._id === payload._id ? payload : meal
        ),
        loading: false,
        sidebarOpen: false
      };
    case SET_CURRENT_VIEW:
      return {
        ...state,
        currentView: payload
      };
    case MEAL_DELETED:
      return {
        ...state,
        currentMeal: null,
        meals: state.meals.filter(meal => meal._id !== payload._id),
        loading: false
      };
    case CLEAR_CURRENT_MEAL:
      return {
        ...state,
        currentMeal: null
      };
    case LOGOUT:
      return { ...initialState };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case INGREDIENTS_LOADED:
      return {
        ...state,
        ingredients: payload
      };
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: true
      };
    case CLOSE_SIDEBAR:
      return { ...state, sidebarOpen: false };
    case SET_SIDEBAR_VIEW:
      return { ...state, sidebarView: payload };
    default:
      return state;
  }
}
