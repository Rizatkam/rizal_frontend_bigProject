//Harus Disesuaikan dulu payload nya
import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { ENDPOINT,access_token } from "../../utils/globals";

export const addBook = (data) => {
    const request = axios.post(`${ENDPOINT}buku`, data, {
        headers: {
            authorization: `${access_token}`
        }
    });
    return (dispatch) => {
      request.then((response) => {
        console.log(response,"Add Book Response");
        dispatch({
          type: actionsTypes.ADD_BOOK,
          payload: response.data,data
        });
      });
    };
  };
export const getListBook = () => {
    const request = axios.get(`${ENDPOINT}buku`);
    return (dispatch) => 
        request.then((response) => {
            return dispatch({
                type: actionsTypes.GET_BOOK,
                payload: response.data.data.rows
            });
        });
};
export const getBookById = (id) => {
    const request = axios.get(`${ENDPOINT}buku/${id}`);

    return (dispatch) => 
        request.then((response) => {
            console.log(response,"Get Book by ID Response");
            return dispatch({
                type: actionsTypes.GET_BOOK_BY_ID,
                payload: response.data.data
            });
        });
};

export const updateBook = (data,id) => {
    const request = axios.put(`${ENDPOINT}buku/${id}`, data, {
        headers: {
            authorization: `${access_token}`
        }
    })

    return (dispatch) => 
        request.then((response) => {
            console.log(response,"Update Book Response");
            dispatch({
                type: actionsTypes.UPDATE_BOOK,
                payload: response.data.data
            });
            return dispatch(getListBook());
        });
};

export const deleteBook = (id) => {
    const request = axios.delete(`${ENDPOINT}buku/${id}`, {
        headers: {
            authorization: `${access_token}`
        }
    })

    return (dispatch) => 
        request.then((response) => {
            console.log(response,"Delete Book by ID Response");
            dispatch({
                type: actionsTypes.GET_BOOK_BY_ID,
                payload: response.data.data
            })
            return dispatch(getListBook());
        });
};
