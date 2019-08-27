import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // CLEAR_PROFILE,
  LOGOUT,
  ADD_ALERT,
  CLEAR_ALERTS
} from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };
  const body = JSON.stringify({ username, email, password });

  try {
    dispatch({ type: CLEAR_ALERTS });

    const res = await axios.post("/api/users", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    dispatch(loadUser);
  } catch (error) {
    error.response.data.errors.forEach(error =>
      dispatch({
        type: ADD_ALERT,
        payload: { message: error.msg, style: "danger" }
      })
    );

    dispatch({ type: REGISTER_FAIL });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/api/users/me");

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    dispatch({ type: CLEAR_ALERTS });

    const res = await axios.post("/api/users/login", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (error) {
    error.response.data.errors.forEach(error =>
      dispatch({
        type: ADD_ALERT,
        payload: { message: error.msg, style: "danger" }
      })
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/api/users/logout");
    dispatch({ type: LOGOUT });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};
