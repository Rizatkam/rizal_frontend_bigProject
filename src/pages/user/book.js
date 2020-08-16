import React, { useState, useEffect } from "react";
import Book from "../../components/bookUser";
import { Form } from "react-bootstrap";
import { ENDPOINT, token } from "../../utils/globals";
import { connect } from "react-redux";
import axios from "axios";
import JwtDecode from "jwt-decode";
import { getListBook } from "../../store/actions";
import Header from "../../components/headerUser";
import Footer from "../../components/footer";

const mapDispatchToProps = (dispatch) => {
  return {
    getListBook: (params) => dispatch(getListBook(params)),
  };
};
const mapStateToProps = (state) => {
  return {
    books: state.books.books,
  };
};
const BookPage = (props) => {
  const [dataKategori, setDataKategori] = useState([]);
  const [kategori_id, setKategori] = useState("");
  const { getListBook, books, history } = props;
  async function getCategory() {
    const request = await axios.get(`${ENDPOINT}kategori`);
    setDataKategori(request.data.data.rows);
  }
  useEffect(() => {
    getListBook({ kategori_id: kategori_id });
    getCategory();
  }, [getListBook, kategori_id]);
  useEffect(() => {
    if (!(token && JwtDecode(token) && JwtDecode(token).role_id === 2)) {
      window.localStorage.removeItem("token");
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="App-header">
      <Header />
      <div className="container m-3">
        <h2>CILSY+</h2>
      </div>
      <Form.Row>
        <Form.Group controlId="formGridCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setKategori(e.target.value)}
          >
            <option value="">--Choose--</option>
            {dataKategori.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <div className="container">
        <div className="row">
          {books && books.map((val, key) => <Book key={key} book={val} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
