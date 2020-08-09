import React, { useState, useEffect } from "react";
import Book from "../../components/bookUser";
import { Form } from "react-bootstrap";
import { ENDPOINT, access_token } from "../../utils/globals";
import { connect } from "react-redux";
import axios from "axios";
import { getListBook } from "../../store/actions";
import Header from "../../components/header";
import Footer from "../../components/footer";

const mapDispatchToProps = (dispatch) => {
  return {
    getListBook: (params) => dispatch(getListBook(params)),
  };
};
const mapStateToProps = (state) => {
  return {
    books: state.books.books,
    user: state.users,
  };
};
const BookPage = (props) => {
  const [dataKategori, setDataKategori] = useState([]);
  const [kategori_id, setKategori] = useState("");
  const { getListBook, user, match, history } = props;
  async function getCategory() {
    const request = await axios.get(`${ENDPOINT}kategori`);
    setDataKategori(request.data.data.rows);
  }
  useEffect(() => {
    if (match && match.params) {
      getListBook({ kategori_id: kategori_id });
      getCategory();
    }
  }, [match, getListBook, kategori_id]);
  useEffect(() => {
    if (!(user && user.user && user.user.role_id === 2 && access_token)) {
      history.push("/login");
    }
  }, [user]);

  return (
    <div className="App-header">
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
          {props.books &&
            props.books.map((val, key) => <Book key={key} book={val} />)}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
