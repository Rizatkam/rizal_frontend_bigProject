import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import AdminAddBook from './pages/admin/addBook';
import AdminBook from './pages/admin/book';
import AdminBookDetail from './pages/admin/bookDetail';
import AdminOrder from './pages/admin/orders';

import UserBook from './pages/user/book';
import UserBookDetail from './pages/user/bookDetail';
import UserOrder from './pages/user/orders';
import UserOrderDetail from './pages/user/orderDetail';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>

      <Route path='/user/book/:id' component={UserBookDetail}/>
      <Route path='/user/book' component={UserBook}/>
      <Route path='/user/orders' component={UserOrder}/>
      <Route path='/user/orderDetail/:id' component={UserOrderDetail}/>

      <Route path='/admin/addBook' component={AdminAddBook}/>
      <Route path='/admin/book/:id' component={AdminBookDetail}/>
      <Route path='/admin/book' component={AdminBook}/>
      <Route path='/admin/orders' component={AdminOrder}/>
    </Switch>
    </div>
  );
}

export default App;