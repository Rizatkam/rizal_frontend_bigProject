import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { ENDPOINT } from "../../utils/globals";
import { getBookById, updateBook, deleteBook } from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (id) => dispatch(getBookById(id)),
    updateBook: (data) => dispatch(updateBook(data)),
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
  const {book} =props;
  
  const status = book.status_id === 1 ? "info" : "warning";
  
  useEffect((id) => {
    props.getBookById(id);
    setData({
      id: props.match.params.id,
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
  }, []);
  const handleUpdate = (data) => {
    props.updateBook(data);
  };
  const handleDelete = (id) => {
    props.deleteBook(id);
  };
  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  return (
    <div className="App">
      <div className="container">
        <Card className="pl-o p-5">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {edit ? 
              (<Form.Control value={data.title} onChange={(e) => handleForm(e, "title")}/>
                ):(
              <h2 style={{ color: "#8052ff" }}>{book.title}</h2>)}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {edit ?(<Form.File 
              value={data.image_url}
              onChange={(e) => handleForm(e, "image_url")} 
              label="Insert Here!"/>):(<img
                className="img-fluid"
                variant="top"
                alt=""
                src={`${ENDPOINT}${book.image_url}`}
                width={450}
              />)}
            </div>
            <div className="col-md-4">
              <Button variant={status}
              className="btn-sm font-weight-bold m-2">
                {book.status.name}
              </Button>
              <h4
                className="my-2 font-weight-bold"
                style={{ color: "#8052ff" }}
              >
                {`Rp ${numeral(book.harga).format("0,0")}`}
              </h4>
              <h5 className="my-3 text-dark text-left">
                Author: {book.author}
              </h5>
              <h6 className="my-3 text-dark text-left">
                ISBN Number: {book.no_isbn}
              </h6>
              <h6>
                Weight:{book.berat}
              </h6>
              <h6 className="text-left">Description :</h6>
              <p className="text-black-50 text-justify">{book.description}</p>
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
