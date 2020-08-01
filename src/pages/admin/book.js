// Belum Disesuaikan
import React, { useEffect } from 'react';
import '../../App.css';
import Book from '../../components/admin/book';
import {connect} from 'react-redux';
import {getListBook, updateBook, deleteBook} from '../../store/actions'
import book from '../../components/admin/book';

  const mapDispatchToProps=(dispatch)=>{
    return{getBook:()=>dispatch(getListBook()),
    updateBook:(data)=>dispatch(updateBook(data)),
  deleteBook:(id)=>dispatch(deleteBook(id))}
  }
  const mapStateToProps = (state) => {
    console.log(state,"Ini state dari page Book Admin mapStateToProps")
    return {
      books: state.books.books
    };
  };

const BookPage = (props) => {
  console.log(props,"Ini props dari page Book Admin")
  useEffect(()=>{
   props.getBook();
 },[]);
 const handleUpdate=(data)=>{
   props.updateBook(data);
 };
 const handleDelete=(id)=>{
  props.deleteBook(id);
};
  return (
    <div className="App">
      <header className="App-header">
        <div className="container m-3">
          <h2>Redux-Books</h2>
        </div>
        <div className="container">
          <div className="row">
            {props.books && props.books.map((val, key) =>
              <Book key={key} book={val}
              doUpdate={handleUpdate}
              doDelete={handleDelete}/> 
              )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);