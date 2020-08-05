//Harus Disesuaikan dulu payload nya
import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/globals";

export const addBook = (
  status_id,
  kategori_id,
  title,
  harga,
  author,
  image_url,
  no_isbn,
  berat,
  description
) => {
  console.log(
    status_id,
    kategori_id,
    title,
    harga,
    author,
    image_url,
    no_isbn,
    berat,
    description,
    "ini data Action addBook"
  );
  const request = axios.post(
    `${ENDPOINT}buku`,
    {
      'status_id': status_id,
      'kategori_id': kategori_id,
      'title': title,
      'harga': harga,
      'author': author,
      'image_url': image_url,
      'no_isbn': no_isbn,
      'berat': berat,
      'description': description,
    },
    {
      headers: {
        authorization: `${access_token}`,
      },
    }
  );
  return (dispatch) => {
    request.then((response) => {
      console.log(response, "Add Book Response");
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

export const updateBook = (
  id,
  status_id,
  kategori_id,
  title,
  harga,
  author,
  image_url,
  no_isbn,
  berat,
  description
) => {
  console.log(
    id,
    status_id,
    kategori_id,
    title,
    harga,
    author,
    image_url,
    no_isbn,
    berat,
    description,
    "ini data Action updateBook"
  );
  const request = axios.put(
    `${ENDPOINT}buku/${id}`,
    {
      'id':id,
      'status_id': status_id,
      'kategori_id': kategori_id,
      'title': title,
      'harga': harga,
      'author': author,
      'image_url': image_url,
      'no_isbn': no_isbn,
      'berat': berat,
      'description': description,
    },
    {
      headers: {
        authorization: `${access_token}`,
      },
    }
  );

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "Update Book Response");
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
      authorization: `${access_token}`,
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
