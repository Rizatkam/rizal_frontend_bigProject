import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT } from "../../utils/globals";

export const registerUser = (name, email, password) => {
  console.log(name, email, password, "ini data Action Register");
  const request = axios.post(`${ENDPOINT}users/register`, {
    role_id: 2,
    name: name,
    email: email,
    password: password,
  });
  return (dispatch) => {
    request.then((response) => {
      console.log(response, "ini response Register");
      return dispatch({
        type: actionsTypes.ADD_USER,
        payload: response.data.data,
      });
    });
  };
};
export const loginUser = (email, password) => {
  console.log(email, password, "ini email dan password Action Login");
  const request = axios.post(`${ENDPOINT}users/login`, {
    email,
    password,
  });
  return (dispatch) => {
    request.then((response) => {
      console.log(response, "ini response Login");
      window.localStorage.setItem("token", response.data.data.token);
      return dispatch({
        type: actionsTypes.LOGIN_USER,
        payload: response.data.data,
      });
    });
  };
};
