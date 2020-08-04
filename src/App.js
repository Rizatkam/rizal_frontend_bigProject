import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import AdminAddBook from './pages/admin/addBook2';
import AdminBook from './pages/admin/book';
import AdminBookDetail from './pages/admin/bookDetail2';
// import UserBook from './pages/user/book';
// import UserBookDetail from './pages/user/bookDetail';
// import UserCart from './pages/user/cart';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      {/* <Route path='/user/book/:id' component={UserBookDetail}/>
      <Route path='/user/book' component={UserBook}/>
      <Route path='/user/cart' component={UserCart}/> */}
      <Route path='/admin/addBook' component={AdminAddBook}/>
      <Route path='/admin/book/:id' component={AdminBookDetail}/>
      <Route path='/admin/book' component={AdminBook}/>
    </Switch>
    </div>
  );
}

export default App;