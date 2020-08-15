import * as actionTypes from "../actions/actionsTypes";

const initial = {
  items: [],
  item: {},
};

const cart = (state = initial, action) => {
  console.log(action.payload, "ini payload action dari Reducer Cart.");
  switch (action.type) {
    case actionTypes.ADD_CART:
      return {
        ...state,
        item: action.payload,
      };
    case actionTypes.GET_CART:
      return {
        ...state,
        items: action.payload,
      };
    case actionTypes.GET_CART_BY_ID:
      return {
        ...state,
        item: action.payload,
      };
    case actionTypes.UPDATE_CART:
      return {
        ...state,
        item: action.payload,
      };
    case actionTypes.DELETE_CART:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};

export default cart;
