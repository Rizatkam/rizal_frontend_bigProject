import { combineReducers } from "redux";
import books from "./books";
import users from "./users";
import orders from "./orders";
import cart from "./cart";
import categories from "./categories";

export default combineReducers({ books, categories, users, orders, cart });
