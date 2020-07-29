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
        dispatch({
          type: actionsTypes.ADD_BOOK,
          payload: response.data,
        });
      });
    };
  };
export const getListBook = () => {
    const request = axios.get(`${ENDPOINT}buku`);
    return (dispatch) => 
        request.then((response) => {
            console.log(response)
            return dispatch({
                type: actionsTypes.GET_BOOK,
                payload: response.data
            });
        });
};
export const getBookById = (id) => {
    const request = axios.get(`${ENDPOINT}buku/${id}`);

    return (dispatch) => 
        request.then((response) => {
            console.log(response);
            return dispatch({
                type: actionsTypes.GET_BOOK_BY_ID,
                payload: response.data
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
            console.log(response);
            dispatch({
                type: actionsTypes.UPDATE_BOOK,
                payload: response.data
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
            console.log(response)
            dispatch({
                type: actionsTypes.GET_BOOK_BY_ID,
                payload: response.data
            })
            return dispatch(getListBook());
        });
};
