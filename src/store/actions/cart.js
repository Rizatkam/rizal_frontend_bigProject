import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT, token } from "../../utils/globals";

export const addCart = (data) => {
  const request = axios.post(`${ENDPOINT}cart`, data, {
    headers: {
      authorization: `${token}`,
    },
  });
  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionsTypes.ADD_CART,
        payload: response.data.data,
      });
    });
  };
};
export const getListCart = (uid) => {
  const request = axios.get(`${ENDPOINT}cart?user_id=${uid}`);
  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: actionsTypes.GET_CART,
        payload: response.data.data.rows,
      });
    });
};

export const getCartById = (id, uid) => {
  const request = axios.get(`${ENDPOINT}cart/${id}?user_id=${uid}`);

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Get Book by ID Response");
      return dispatch({
        type: actionsTypes.GET_CART_BY_ID,
        payload: response.data.data,
      });
    });
};

export const updateCart = (id, data) => {
  const request = axios.put(`${ENDPOINT}cart/${id}`, data, {
    headers: {
      authorization: `${token}`,
    },
  });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: actionsTypes.UPDATE_CART,
        payload: response.data.data,
      });
      return dispatch(getListCart());
    });
};

export const deleteCart = (id) => {
  const request = axios.delete(`${ENDPOINT}cart/${id}`, {
    headers: {
      authorization: `${token}`,
    },
  });

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Delete Book by ID Response");
      dispatch({
        type: actionsTypes.DELETE_CART,
        payload: response.data.data,
      });
      return dispatch(getListCart());
    });
};
