import React, { useEffect } from "react";
import "../../App.css";
import Book from "../../components/admin/book2";
import { connect } from "react-redux";
import { getListBook } from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getListBook: () => dispatch(getListBook()),
  };
};
const mapStateToProps = (state) => {
  return {
    books: state.books.books,
  };
};
const BookPage = (props) => {
    useEffect(() => {
      props.getListBook();
    }, []);

return (
    <div className="App">
      <header className="App-header">
        <div className="container m-3">
          <h2>CILSY+</h2>
        </div>
        <div className="container">
          <div className="row">
            {props.books &&
              props.books.map((val, key) => (
                <Book
                  key={key}
                  book={val}/>
              ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);