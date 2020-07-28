import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { ENDPOINT,access_token } from "../../utils/globals";

const addBook = (data) => {
    const request = axios.post(`${ENDPOINT}buku`, data);
  
    return (dispatch) => {
      request.then((response) => {
        dispatch({
          type: actionsTypes.ADD_BOOK,
          payload: response.data,
        });
      });
    };
  };
const getListBook = () => {
    const request = axios.get(`${ENDPOINT}buku`, {
        headers: {
            authorization: `${access_token}`
        }
    });
    return (dispatch) => 
        request.then((response) => {
            console.log(response)
            return dispatch({
                type: actionsTypes.GET_BOOK,
                payload: response.data
            });
        });
};
const getBookById = (id) => {
    const request = axios.get(`${ENDPOINT}buku/${id}`, {
        headers: {
            authorization: `${access_token}`
        }
    });

    return (dispatch) => 
        request.then((response) => {
            console.log(response);
            return dispatch({
                type: actionsTypes.GET_BOOK_BY_ID,
                payload: response.data
            });
        });
};

const updateBook = (data,id) => {
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

const deleteBook = (id) => {
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
export default ({
    getListBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook
})