import * as actionTypes from "../actions/actionsTypes";

const initial = {
  books: [],
  book: {},
  // book: null,
  // buku:{},
};

const books = (state = initial, action) => {
  console.log(action.payload, "ini payload action dari Reducer Books.");
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return {
        ...state,
        book: action.payload,
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
        book: action.payload,
      };
    case actionTypes.DELETE_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
};

export default books;
