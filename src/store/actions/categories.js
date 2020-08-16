import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT, token } from "../../utils/globals";

export const addCategory = (name) => {
  console.log(name, "ini name dari action Category.");
  const request = axios.post(
    `${ENDPOINT}kategori`,
    { name },
    {
      headers: {
        authorization: `${token}`,
      },
    }
  );
  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionsTypes.ADD_CATEGORY,
        payload: response.data.data,
      });
    });
  };
};
export const getListCategory = () => {
  const request = axios.get(`${ENDPOINT}kategori`);
  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: actionsTypes.GET_CATEGORY,
        payload: response.data.data.rows,
      });
    });
};

export const getCategoryById = (id) => {
  const request = axios.get(`${ENDPOINT}kategori/${id}`);

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Get Book by ID Response");
      return dispatch({
        type: actionsTypes.GET_CATEGORY_BY_ID,
        payload: response.data.data,
      });
    });
};

export const updateCategory = (id, data) => {
  const request = axios.put(`${ENDPOINT}kategori/${id}`, data, {
    headers: {
      authorization: `${token}`,
    },
  });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: actionsTypes.UPDATE_CATEGORY,
        payload: response.data.data,
      });
      return dispatch(getListCategory());
    });
};

export const deleteCategory = (id) => {
  const request = axios.delete(`${ENDPOINT}kategori/${id}`, {
    headers: {
      authorization: `${token}`,
    },
  });

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Delete Book by ID Response");
      dispatch({
        type: actionsTypes.DELETE_CATEGORY,
        payload: response.data.data,
      });
      return dispatch(getListCategory());
    });
};
