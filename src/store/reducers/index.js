import {combineReducers} from 'redux';
import books from './books';
import users from './users';
import cart from './cart'

export default combineReducers({books,users,cart})