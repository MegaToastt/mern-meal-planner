import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // CLEAR_PROFILE,
  LOGOUT
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
