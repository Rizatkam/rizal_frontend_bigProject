import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT, access_token, uid } from "../../utils/globals";

export const addOrder = (data) => {
  console.log(data, "ini data dari action order");
  const request = axios.post(`${ENDPOINT}orders`, data, {
    headers: {
      authorization: `${access_token}`,
    },
  });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: actionsTypes.ADD_ORDER,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
  };
};
export const getListOrder = () => {
  const request = axios.get(`${ENDPOINT}orders?user_id=${uid}`, {
    headers: {
      authorization: `${access_token}`,
    },
  });
  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: actionsTypes.GET_ORDER,
        payload: response.data.data.rows,
      });
    });
};

export const getOrderById = (id) => {
  const request = axios.get(`${ENDPOINT}orders/${id}?user_id=${uid}`, {
    headers: {
      authorization: `${access_token}`,
    },
  });
  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: actionsTypes.GET_ORDER_BY_ID,
        payload: response.data.data,
      });
    });
};
