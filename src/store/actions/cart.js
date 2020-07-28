import * as actionsTypes from "./actionTypes";
import axios from "axios";
import { ENDPOINT } from "../../utils/globals";

const getListCart = () => {
  const request = axios.get(`${ENDPOINT}carts`);

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

const addToCart = (data) => {
  const request = axios.post(`${ENDPOINT}carts`, data);

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

const deleteFromCart = (id) => {
  const request = axios.delete(`${ENDPOINT}carts/${id}`);

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

const updateOnCart = (id, data) => {
  const request = axios.put(`${ENDPOINT}carts/${id}`, data);

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
export default ({
    getListCart,
    addToCart,
    deleteFromCart,
    updateOnCart,
})