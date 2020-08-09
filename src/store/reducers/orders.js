import * as actionTypes from "../actions/actionsTypes";

const initial = {
  orders: [],
  order: {},
};

const orders = (state = initial, action) => {
  console.log(action.payload, "ini payload action dari Reducer Orders.");
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case actionTypes.GET_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.GET_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default orders;
