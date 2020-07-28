import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    isLogin: false,
    user: {}
};
const users = (state = initialState, action) => {
    console.log(state, "User")
    switch(action.type){
        case actionTypes.ADD_USER:
    return {
        ...state,
        user:action.data
            };
        case actionTypes.LOGIN_USER:
    return {
        ...state,
        user:action.data,
        isLogin: true
            }; 
    default: 
        return state
    };   
}
export default users