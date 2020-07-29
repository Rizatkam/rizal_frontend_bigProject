import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT } from "../../utils/globals";

export const getListCart = () => {
  const request = axios.get(`${ENDPOINT}cart`);

  return (dispatch) => {
    request.then((response) => {
      console.log(response, "Respon getListCart");
      return dispatch({
        type: actionsTypes.GET_LIST_CART,
        payload: response.data,
      });
    });
  };
};

export const addToCart = (data) => {
  const request = axios.post(`${ENDPOINT}cart`, data);

  return (dispatch) => {
    request.then((response) => {
      console.log(response, "Response from add book to cart action");
      dispatch({
        type: actionsTypes.ADD_TO_CART,
        payload: response.data,
      });
    });
  };
};

export const deleteFromCart = (id) => {
  const request = axios.delete(`${ENDPOINT}cart/${id}`);

  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionsTypes.DELETE_FROM_CART,
        payload: response.data,
      });
      return dispatch(getListCart());
    });
  };
};

export const updateOnCart = (id, data) => {
  const request = axios.put(`${ENDPOINT}cart/${id}`, data);

  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionsTypes.UPDATE_ON_CART,
        payload: response.data,
      });

      return dispatch(getListCart());
    });
  };
};