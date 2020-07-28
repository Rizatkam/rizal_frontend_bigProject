import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  addedItems: [],
  total: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CART:
      return {
        ...state,
        addedItems: action.payload,
      };
    case actionTypes.UPDATE_ON_CART:
      return {
        ...state,
      };
    case actionTypes.DELETE_FROM_CART:
      return {
        ...state,
      };
    default:
      console.log(initialState, "Call data from cartReducer");
      return initialState;
  }

};

export default cart;
