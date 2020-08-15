import * as actionTypes from "../actions/actionsTypes";

const initial = {
  categories: [],
  category: {},
};

const categories = (state = initial, action) => {
  console.log(action.payload, "ini payload action dari Reducer Categories.");
  switch (action.type) {
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        book: action.payload,
      };
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        books: action.payload,
      };
    case actionTypes.GET_CATEGORY_BY_ID:
      return {
        ...state,
        book: action.payload,
      };
    case actionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        book: action.payload,
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
};

export default categories;
