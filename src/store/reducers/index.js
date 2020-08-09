import {combineReducers} from 'redux';
import books from './books';
import users from './users';
import orders from './orders';

export default combineReducers({books,users,orders})