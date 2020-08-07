import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/globals";
import { getBookById, updateBook, deleteBook } from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (id) => dispatch(getBookById(id)),
    updateBook: (id, data) => dispatch(updateBook(id, data)),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};
const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page BookDetailPage mapStateToProps");
  return {
    book: state.books.book,
    user: state.users,
  };
};

const BookDetailPage = (props) => {
  console.log(props, "Ini props dari page BookDetailPage");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
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
  const [variant, setVariant] = useState("");
  const {
    book,
    user,
    match,
    history,
    getBookById,
    updateBook,
    deleteBook,
  } = props;

  async function getCategory() {
    const request = await axios.get(`${ENDPOINT}kategori`);
    setDataKategori(request.data.data.rows);
  }

  useEffect(() => {
    if (match && match.params.id) {
      getBookById(match.params.id);
      setId(match.params.id);
    }
  }, [match, getBookById]);
  useEffect(() => {
    if (book) {
      getCategory();
      setStatus(book.status_id);
      setKategori(book.kategori_id);
      setTitle(book.title);
      setHarga(book.harga);
      setAuthor(book.author);
      setImage(book.image_url);
      setNoisbn(book.no_isbn);
      setBerat(book.berat);
      setDesc(book.description);
      setVariant(book.status_id === 1 ? "info" : "warning");
    }
  }, [book]);
  useEffect(() => {
    if (!(user && user.user && user.user.role_id === 1 && access_token)) {
      history.push("/login");
    }
  }, [user]);

  const handleUpdate = (e) => {
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
    updateBook(id, data);
  };
  const handleDelete = () => {
    deleteBook(id);
  };
  return (
      <div className="App">
        <div className="container">
          <Card className="pl-o p-5">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                {/* title */}
                {edit ? (
                  <Form.Control
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <h2 style={{ color: "#8052ff" }}>{book && book.title}</h2>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                {/* image_url */}
                {edit ? (
                  <Form.File
                    inputProps={{
                      accept: "images/jpeg, images/jpg, images/png",
                    }}
                    label="Insert Here!"
                    className="form-control"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                ) : (
                  <img
                    className="img-fluid"
                    variant="top"
                    alt=""
                    src={`${ENDPOINT}${book.image_url}`}
                    width={450}
                  />
                )}
              </div>
              <div className="col-md-4">
                {/* status */}
                {edit ? (
                  <Form.Control
                    as="select"
                    placeholder="status"
                    value={status_id}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>--Choose Status--</option>
                    <option value="1">FOR SELL</option>
                    <option value="2">OUT OF STOCK</option>
                  </Form.Control>
                ) : (
                  <Button
                    variant={variant}
                    className="btn-sm font-weight-bold m-2"
                  >
                    {book.status ? book.status.name : null}
                  </Button>
                )}
                {/* kategori */}
                {edit ? (
                  <Form.Control
                    as="select"
                    placeholder="Kategori"
                    value={kategori_id}
                    onChange={(e) => setKategori(e.target.value)}
                  >
                    <option>--Choose Kategori--</option>
                    {dataKategori.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                ) : (
                  <h3 style={{ color: "#8052ff" }}>
                    {book.kategori ? book.kategori.name : null}
                  </h3>
                )}
                {/* harga */}
                {edit ? (
                  <Form.Control
                    placeholder="Harga"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  />
                ) : (
                  <h4
                    className="my-2 font-weight-bold"
                    style={{ color: "#8052ff" }}
                  >
                    {`Rp ${numeral(book && book.harga).format("0,0")}`}
                  </h4>
                )}
                {/* author */}
                {edit ? (
                  <Form.Control
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                ) : (
                  <h5 className="my-3 text-dark text-left">
                    Author: {book && book.author}
                  </h5>
                )}
                {/* no_isbn */}
                {edit ? (
                  <Form.Control
                    placeholder="No.ISBN"
                    value={no_isbn}
                    onChange={(e) => setNoisbn(e.target.value)}
                  />
                ) : (
                  <h6 className="my-3 text-dark text-left">
                    ISBN Number: {book && book.no_isbn}
                  </h6>
                )}
                {/* berat */}
                {edit ? (
                  <Form.Control
                    placeholder="Berat"
                    value={berat}
                    onChange={(e) => setBerat(e.target.value)}
                  />
                ) : (
                  <h6>Weight:{book && book.berat}</h6>
                )}
                {/* description */}
                <h6 className="text-left">Description :</h6>
                {edit ? (
                  <Form.Control
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                ) : (
                  <p className="text-black-50 text-justify">
                    {book && book.description}
                  </p>
                )}
              </div>
            </div>
            {edit ? (
              <div>
                <Button
                  variant="primary"
                  onClick={(id, e) => handleUpdate(id, e)}
                >
                  Save
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="success" onClick={() => setEdit(true)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={(id) => handleDelete(id)}>
                  Delete
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
