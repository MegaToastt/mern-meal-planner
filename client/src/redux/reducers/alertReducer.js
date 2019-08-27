import { ADD_ALERT, CLEAR_ALERTS } from "../actions/actionTypes";

const initialState = [];

export default function alertReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case CLEAR_ALERTS:
      return [];
    default:
      return state;
  }
}
