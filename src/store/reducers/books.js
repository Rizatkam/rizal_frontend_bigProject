import * as actionTypes from "../actions/actionsTypes";

const initial = {
  books: [],
  book: {},
};

const books = (state = initial, action) => {
  console.log(action.payload, "ini payload action.");
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return {
        ...state,
        book: action.payload.data.book,
      };
    case actionTypes.GET_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case actionTypes.GET_BOOK_BY_ID:
      return {
        ...state,
        book: action.payload,
      };
    case actionTypes.UPDATE_BOOK:
      return {
        ...state,
      };
    case actionTypes.DELETE_BOOK:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default books;
