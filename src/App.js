import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AdminAddBook from "./pages/admin/addBook";
import AdminBook from "./pages/admin/book";
import AdminBookDetail from "./pages/admin/bookDetail";
import AdminOrder from "./pages/admin/orders";
import AdminOrderDetail from "./pages/admin/orderDetail";
import AdminCategory from "./pages/admin/category";

import UserBook from "./pages/user/book";
import UserBookDetail from "./pages/user/bookDetail";
import UserOrder from "./pages/user/orders";
import UserOrderDetail from "./pages/user/orderDetail";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/user/book/:id" component={UserBookDetail} />
        <Route exact path="/user/book" component={UserBook} />
        <Route exact path="/user/order" component={UserOrder} />
        <Route path="/user/order/:id" component={UserOrderDetail} />

        <Route path="/admin/addBook" component={AdminAddBook} />
        <Route path="/admin/book/:id" component={AdminBookDetail} />
        <Route exact path="/admin/book" component={AdminBook} />
        <Route exact path="/admin/order" component={AdminOrder} />
        <Route path="/admin/order/:id" component={AdminOrderDetail} />
        <Route exact path="/admin/category" component={AdminCategory} />
      </Switch>
    </div>
  );
}

export default App;
