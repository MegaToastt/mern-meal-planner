import { ADD_ALERT, CLEAR_ALERTS } from "./actionTypes";

export const addAlert = ({ message, style }) => {
  return { type: ADD_ALERT, payload: { message, style } };
};

export const clearAlerts = () => {
  return { type: CLEAR_ALERTS };
};
