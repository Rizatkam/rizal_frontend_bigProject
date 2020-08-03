import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addBook } from "../../store/actions";

const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page addBook mapStateToProps");
  return {
    buku: state.books.buku,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (data) => dispatch(addBook(data)),
  };
};

const AddBook = (props) => {
  console.log(props, "ini props dari AddBook.");
  const [goto, setGoto] = useState(false);
  const [data, setData] = useState({});
  const { book } = props;

  const onSubmitAddBook = (e) => {
    e.preventDefault();
    props.addBook(data);
    setData({
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
  };
  // useEffect(() => {
  //   if (book) {
  //     console.log(book, "book dari Add Book");
  //     setData({
  //       kategori_id: book.kategori.id,
  //       status_id: book.status.id,
  //       title: book.title,
  //       harga: book.harga,
  //       author: book.author,
  //       image_url: book.image_url,
  //       no_isbn: book.no_isbn,
  //       berat: book.berat,
  //       description: book.description,
  //     });
  //   }
  // }, [book]);
  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };
  return (
    <div className="main-wrapper">
      {goto ? <Redirect to="/admin/book" /> : ""}
      <div>
        <Form onSubmit={(e) => onSubmitAddBook(e)}>
          <Form.Row>
            <Form.Group controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={data.title}
                onChange={(e) => handleForm(e, "title")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={data.status_id}
                onChange={(e) => handleForm(e, "status_id")}
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
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridName">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={data.author}
                onChange={(e) => handleForm(e, "author")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridIdNumber">
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type="number"
                value={data.no_isbn}
                onChange={(e) => handleForm(e, "no_isbn")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridIdWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                value={data.berat}
                onChange={(e) => handleForm(e, "berat")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridIdDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={data.description}
                onChange={(e) => handleForm(e, "description")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridCurrency">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={data.harga}
                onChange={(e) => handleForm(e, "harga")}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridImage">
              <Form.Label>Book Cover</Form.Label>
              <Form.File
                value={data.image_url}
                onChange={(e) => handleForm(e, "image_url")}
                label="Insert Here!"
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
