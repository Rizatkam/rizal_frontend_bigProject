import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { ENDPOINT } from "../../utils/globals";

const registerUser = ({data}) => {
    return {
    type: actionsTypes.ADD_USER,
    payload: axios.post(`${ENDPOINT}users/register`, data)
    }
    }
const loginUser = ({data}) => {
        return {
        type: actionsTypes.LOGIN_USER,
        payload: axios.post(`${ENDPOINT}users/login`, {
        'email': data.email,
        'password': data.password
        })
        }
        }
export default ({
    loginUser,
    registerUser
        })