import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { ENDPOINT } from "../../utils/globals";

export const registerUser = ( name, email, password ) => {
    return {
        type: actionsTypes.ADD_USER,
        payload: axios.post(`${ENDPOINT}users/register`, {
            'role_id':2,
            'name': name,
            'email': email,
            'password': password,
        })
    }
}
export const loginUser = (email, password) => {
    console.log(email,password,"ini email dan password")
    const request=axios.post(`${ENDPOINT}users/login`,{
        email,password
    })
    console.log(request,"ini Request")
    return (dispatch)=>{
        request.then((response)=>{
            console.log(response,"ini response");
            window.localStorage.setItem("token",response.data.data.token);
            return dispatch({
                type:actionsTypes.LOGIN_USER,
                payload:response.data
            })
        })
    }
}