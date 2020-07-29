import * as actionTypes from "../actions/actionsTypes";

const initial = {
    user: {},
    access_token: {},
    isLoggedIn: false,
  };  
const users = (state = initial, action) => {
    console.log(action.payload, "action")
    switch(action.type){
        case actionTypes.ADD_USER:
    return {
        ...state,
        access_token: action.payload.data.access_token,
        user: action.payload.data.user,
        isLoggedIn: true
      };
        case actionTypes.LOGIN_USER:
    return {
        ...state,
        user: action.payload.data.user,
        access_token: action.payload.data.access_token,
        isLoggedIn: true
            };
    default: 
        return state
    };   
}
export default users