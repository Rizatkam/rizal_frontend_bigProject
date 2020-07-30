import * as actionTypes from "../actions/actionsTypes";

const initial = {
    users: {},
    token: {},
    isLoggedIn: false,
  };  
const users = (state = initial, action) => {
    console.log(action.payload, "ini payload action.")
    switch(action.type){
        case actionTypes.ADD_USER:
    return {
        ...state,
        user: action.payload.data.user,
        isLoggedIn: false
      };
        case actionTypes.LOGIN_USER:
    return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.data.token,
        isLoggedIn: true
            };
    default: 
        return state
    };   
}
export default users