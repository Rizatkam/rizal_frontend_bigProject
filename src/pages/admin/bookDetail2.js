import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { ENDPOINT } from "../../utils/globals";
import { getBookById, updateBook, deleteBook } from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (id) => dispatch(getBookById(id)),
    updateBook: (data, id) => dispatch(updateBook(data, id)),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};
const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page BookDetailPage mapStateToProps");
  return {
    book: state.books.book,
  };
};

const BookDetailPage = (props) => {
  console.log(props, "Ini props dari page BookDetailPage");
  const [edit, setEdit] = useState(false);
  const [status_id, setStatus] = useState(0);
  const [kategori_id, setKategori] = useState(0);
  const [title, setTitle] = useState("");
  const [harga, setHarga] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage] = useState("");
  const [no_isbn, setNoisbn] = useState("");
  const [berat, setBerat] = useState(0);
  const [description, setDesc] = useState("");
  const [goto, setGoto] = useState(false);

  useEffect((id) => {
    props.getBookById(props.match.params.id);
  }, []);
  const handleUpdate = (id, e) => {
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
    props.updateBook(data, id);
  };
  const handleDelete = (id) => {
    props.deleteBook(id);
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <h2 style={{ color: "#8052ff" }}>{title}</h2>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {/* image_url */}
              {edit ? (
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
              ) : (
                <img
                  className="img-fluid"
                  variant="top"
                  alt=""
                  src={`${ENDPOINT}${image_url}`}
                  width={450}
                />
              )}
            </div>
            <div className="col-md-4">
              {/* status */}
              {edit ? (
                <Form.Control
                  as="select"
                  value="warning"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>--Choose--</option>
                  <option value="1">FOR SELL</option>
                  <option value="2">OUT OF STOCK</option>
                </Form.Control>
              ) : (
                <Button
                  variant="warning"
                  className="btn-sm font-weight-bold m-2"
                >
                  {status ? status.name : null}
                </Button>
              )}
              {/* kategori */}
              {edit ? (
                <Form.Control
                  as="select"
                  value={kategori_id}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option>--Choose--</option>
                  <option value="1">Agama</option>
                  <option value="2">Anak-Anak</option>
                  <option value="3">Bisnis dan Ekonomi</option>
                  <option value="4">Buku Medis</option>
                  <option value="5">Pertanian</option>
                  <option value="6">Hukum</option>
                  <option value="7">Komputer dan Teknologi</option>
                </Form.Control>
              ) : (
                <h3 style={{ color: "#8052ff" }}>
                  {kategori ? kategori.name : null}
                </h3>
              )}
              {/* harga */}
              {edit ? (
                <Form.Control
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              ) : (
                <h4
                  className="my-2 font-weight-bold"
                  style={{ color: "#8052ff" }}
                >
                  {`Rp ${numeral(harga).format("0,0")}`}
                </h4>
              )}
              {/* author */}
              {edit ? (
                <Form.Control
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              ) : (
                <h5 className="my-3 text-dark text-left">
                  Author: {author}
                </h5>
              )}
              {/* no_isbn */}
              {edit ? (
                <Form.Control
                  value={no_isbn}
                  onChange={(e) => setNoisbn(e.target.value)}
                />
              ) : (
                <h6 className="my-3 text-dark text-left">
                  ISBN Number: {no_isbn}
                </h6>
              )}
              {/* berat */}
              {edit ? (
                <Form.Control
                  value={berat}
                  onChange={(e) => setBerat(e.target.value)}
                />
              ) : (
                <h6>Weight:{berat}</h6>
              )}
              {/* description */}
              <h6 className="text-left">Description :</h6>
              {edit ? (
                <Form.Control
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              ) : (
                <p className="text-black-50 text-justify">
                  {description}
                </p>
              )}
            </div>
          </div>
          {edit ? (
            <div>
              <Button variant="primary" onClick={() => handleUpdate()}>
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
              <Button variant="danger" onClick={() => handleDelete(book.id)}>
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
