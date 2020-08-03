import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { ENDPOINT } from "../../utils/globals";
import { getBookById, updateBook, deleteBook } from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (id) => dispatch(getBookById(id)),
    updateBook: (data,id) => dispatch(updateBook(data,id)),
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
  const [data, setData] = useState({});
  const [status, setStatus] = useState("warning");
  const { book } = props;

  useEffect((id) => {
    props.getBookById(props.match.params.id);
  }, []);
  useEffect(() => {
    if (book) {
      console.log(book, "ini komponen Book Detail");
      setData({
        id: book.id,
        kategori_id: book.kategori.id,
        kategori:book.kategori,
        status_id: book.status.id,
        status: book.status,
        title: book.title,
        harga: book.harga,
        author: book.author,
        image_url: book.image_url,
        no_isbn: book.no_isbn,
        berat: book.berat,
        description: book.description,
      });
      if (book.status_id === 1) {
        setStatus("info");
      } else {
        setStatus("warning");
      }
    }
  }, [book]);
  const handleUpdate = (data,id) => {
    props.updateBook(data,id);
  };
  const handleDelete = (id) => {
    props.deleteBook(id);
  };
  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };
  console.log(data.status, "ini status");
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
                  value={data.title}
                  onChange={(e) => handleForm(e, "title")}
                />
              ) : (
                <h2 style={{ color: "#8052ff" }}>{data && data.title}</h2>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {/* image_url */}
              {edit ? (
                <Form.File
                  // value={data.image_url}
                  onChange={(e) => handleForm(e, "image_url")}
                  label="Insert Here!"
                />
              ) : (
                <img
                  className="img-fluid"
                  variant="top"
                  alt=""
                  src={`${ENDPOINT}${data.image_url}`}
                  width={450}
                />
              )}
            </div>
            <div className="col-md-4">
              {/* status */}
              {edit ? (
                <Form.Control
                  as="select"
                  value={data.status_id}
                  onChange={(e) => handleForm(e, "status_id")}
                >
                  <option>--Choose--</option>
                  <option value="1">FOR SELL</option>
                  <option value="2">OUT OF STOCK</option>
                </Form.Control>
              ) : (
                <Button
                  variant={status}
                  className="btn-sm font-weight-bold m-2"
                >
                  {data.status ? data.status.name : null}
                </Button>
              )}
              {/* kategori */}
              {edit ? (
                <Form.Control
                  as="select"
                  value={data.kategori_id}
                  onChange={(e) => handleForm(e, "kategori_id")}
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
                  {data.kategori ? data.kategori.name : null}
                </h3>
              )}
              {/* harga */}
              {edit ? (
                <Form.Control
                  value={data.harga}
                  onChange={(e) => handleForm(e, "harga")}
                />
              ) : (
                <h4
                  className="my-2 font-weight-bold"
                  style={{ color: "#8052ff" }}
                >
                  {`Rp ${numeral(data && data.harga).format("0,0")}`}
                </h4>
              )}
              {/* author */}
              {edit ? (
                <Form.Control
                  value={data.author}
                  onChange={(e) => handleForm(e, "author")}
                />
              ) : (
                <h5 className="my-3 text-dark text-left">
                  Author: {data && data.author}
                </h5>
              )}
              {/* no_isbn */}
              {edit ? (
                <Form.Control
                  value={data.no_isbn}
                  onChange={(e) => handleForm(e, "no_isbn")}
                />
              ) : (
                <h6 className="my-3 text-dark text-left">
                  ISBN Number: {data && data.no_isbn}
                </h6>
              )}
              {/* berat */}
              {edit ? (
                <Form.Control
                  value={data.berat}
                  onChange={(e) => handleForm(e, "berat")}
                />
              ) : (
                <h6>Weight:{data && data.berat}</h6>
              )}
              {/* description */}
              <h6 className="text-left">Description :</h6>
              {edit ? (
                <Form.Control
                  value={data.description}
                  onChange={(e) => handleForm(e, "description")}
                />
              ) : (
                <p className="text-black-50 text-justify">
                  {data && data.description}
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
                  setData({
                    id: book.id,
                    kategori_id: book.kategori.id,
                    status_id: book.status.id,
                    title: book.title,
                    harga: book.harga,
                    author: book.author,
                    image_url: book.image_url,
                    no_isbn: book.no_isbn,
                    berat: book.berat,
                    description: book.description,
                  });
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
