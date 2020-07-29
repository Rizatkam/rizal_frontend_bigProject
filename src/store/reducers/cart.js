import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  addedItems: [],
  total: 0,
};

const cart = (state = initialState,action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let existed_item = state.addedItems.find((item) => action.id === item.id);
      if (existed_item) {
        state.addedItems.quantity += 1;
        return {
          ...state,
          total: state.total + state.addedItems.harga,
        };
      } else {
        state.addedItems.quantity = 1;
        let newTotal = state.total + state.addedItems.harga;

        return {
          ...state,
          addedItems: [...state.addedItems, state.addedItems],
          total: newTotal,
        }
      }
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
