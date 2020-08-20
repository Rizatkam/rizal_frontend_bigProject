import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, token } from "../../utils/globals";
import { addBook } from "../../store/actions";
import Header from "../../components/headerAdmin";
import JwtDecode from "jwt-decode";

const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page addBook mapStateToProps");
  return {
    book: state.books.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (data) => dispatch(addBook(data)),
  };
};

const AddBook = (props) => {
  const [status_id, setStatus] = useState(0);
  const [kategori_id, setKategori] = useState(0);
  const [title, setTitle] = useState("");
  const [harga, setHarga] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage] = useState("");
  const [no_isbn, setNoisbn] = useState("");
  const [berat, setBerat] = useState(0);
  const [description, setDesc] = useState("");
  const [dataKategori, setDataKategori] = useState([]);
  const [gotoBook, setGotoBook] = useState(false);
  const { addBook, history } = props;

  const onSubmitAddBook = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("status_id", status_id);
    data.append("kategori_id", kategori_id);
    data.append("title", title);
    data.append("harga", harga);
    data.append("author", author);
    data.append("image_url", image_url);
    data.append("no_isbn", no_isbn);
    data.append("berat", berat);
    data.append("description", description);
    addBook(data);
    if (data) {
      setGotoBook(true);
      alert("Buku sudah masuk ke Database!");
    } else {
      setGotoBook(false);
    }
  };
  async function getCategory() {
    const request = await axios.get(`${ENDPOINT}kategori`);
    setDataKategori(request.data.data.rows);
  }
  useEffect(() => {
    if (!(token && JwtDecode(token) && JwtDecode(token).role_id === 1)) {
      window.localStorage.removeItem("token");
      history.push("/login");
    }
    getCategory();
  }, [history]);

  return (
    <div className="main-wrapper">
      {gotoBook ? <Redirect to="/admin/book" /> : ""}
      <div>
        <Header />
        <Form onSubmit={(e) => onSubmitAddBook(e)}>
          <Form.Row>
            <Form.Group controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>--Choose--</option>
                <option value="1">FOR SELL</option>
                <option value="2">OUT OF STOCK</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setKategori(e.target.value)}
              >
                <option>--Choose--</option>
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

          <Form.Row>
            <Form.Group controlId="formGridName">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridIdNumber">
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type="number"
                value={no_isbn}
                onChange={(e) => setNoisbn(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridIdWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                value={berat}
                onChange={(e) => setBerat(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridIdDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridCurrency">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridImage">
              <Form.Label>Book Cover</Form.Label>
              <Form.File
                inputProps={{ accept: "images/jpeg, images/jpg, images/png" }}
                label="Insert Here!"
                className="form-control"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button variant="primary" type="submit">
              Add New Book
            </Button>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
