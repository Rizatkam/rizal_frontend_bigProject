import React, { useState, useEffect } from "react";
import Book from "../../components/admin/book";
import { access_token } from "../../utils/globals";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getListBook } from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getListBook: () => dispatch(getListBook()),
  };
};
const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    user: state.users,
  };
};
const BookPage = (props) => {
  const [gotoLogin, setGotoLogin] = useState(false);
  const { getListBook, user } = props;
  useEffect(() => {
    getListBook();
    if (user.user.role_id === 1 && access_token) {
      setGotoLogin(false);
    } else {
      setGotoLogin(true);
    }
  }, [user]);

  return (
    <div className="main-wrapper">
      {gotoLogin ? <Redirect to="/login" /> : ""}
      <div className="App">
        <header className="App-header">
          <div className="container m-3">
            <h2>CILSY+</h2>
          </div>
          <div className="container">
            <div className="row">
              {props.books &&
                props.books.map((val, key) => <Book key={key} book={val} />)}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
