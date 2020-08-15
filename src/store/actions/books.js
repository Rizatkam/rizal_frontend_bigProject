import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT, token } from "../../utils/globals";

export const addBook = (data) => {
  const request = axios.post(`${ENDPOINT}buku`, data, {
    headers: {
      authorization: `${token}`,
    },
  });
  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionsTypes.ADD_BOOK,
        payload: response.data.data,
      });
    });
  };
};
export const getListBook = (params) => {
  const request = axios.get(`${ENDPOINT}buku`, { params });
  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: actionsTypes.GET_BOOK,
        payload: response.data.data.rows,
      });
    });
};

export const getBookById = (id) => {
  const request = axios.get(`${ENDPOINT}buku/${id}`);

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Get Book by ID Response");
      return dispatch({
        type: actionsTypes.GET_BOOK_BY_ID,
        payload: response.data.data,
      });
    });
};

export const updateBook = (id, data) => {
  const request = axios.put(`${ENDPOINT}buku/${id}`, data, {
    headers: {
      authorization: `${token}`,
    },
  });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: actionsTypes.UPDATE_BOOK,
        payload: response.data.data,
      });
      return dispatch(getListBook());
    });
};

export const deleteBook = (id) => {
  const request = axios.delete(`${ENDPOINT}buku/${id}`, {
    headers: {
      authorization: `${token}`,
    },
  });

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Delete Book by ID Response");
      dispatch({
        type: actionsTypes.DELETE_BOOK,
        payload: response.data.data,
      });
      return dispatch(getListBook());
    });
};
