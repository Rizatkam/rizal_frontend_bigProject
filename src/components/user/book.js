// Belum Disesuaikan!
import React, { useState, useEffect } from "react";
import { Card, Button, FormControl, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";
import { ENDPOINT } from "../../utils/globals";

const Book = ({ book, doUpdate, doDelete }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const status = book.status_id === 1 ? "info" : "warning";

  useEffect(() => {
      setData({
        id: book.id,
        kategori:book.kategori,
        status: book.status,
        image_url: book.image_url,
        title: book.title,
        description: book.description,
        harga: book.harga,
        author: book.author
      });
    }, []);
  console.log(book, "Komponen Book.");

  const handleUpdate = () => {
    doUpdate(data);
    setEdit(false);
  };
  const handleDelete = (id) => {
    doDelete(id);
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };
  return (
    <div className="col-md-3">
      <Card>
        <Card.Img variant="top" src={`${ENDPOINT}${book.image_url}`} />
        <Card.Body>
          <LinkContainer to={`/book/${book.id}`} style={{ cursor: "pointer" }}>
            <Card.Title className="text-primary">{book.title}</Card.Title>
          </LinkContainer>
          {/*status*/}
          {edit ? (
            <Form.Control
              as="select"
              value={data.status}
              onChange={(e) => handleForm(e, "status")}
            >
              <option>--Choose--</option>
              <option value="FOR_SELL">FOR_SELL</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
            </Form.Control>
          ) : (
            <Button variant={status} className="btn-sm font-weight-bold m-2">
              {book.status.name}
            </Button>
          )}
          {/*harga*/}
          {edit ? (
            <FormControl
              className="mt-2"
              type="number"
              as="input"
              value={data.harga}
              onChange={(e) => handleForm(e, "harga")}
            />
          ) : (
            <h4 className="font-weight-bold" style={{ color: "#8052ff" }}>
              {`Rp ${numeral(book.harga).format("0,0")}`}
            </h4>
          )}
          {/*author*/}
          {edit ? (
            <FormControl
              className="mt-2"
              as="input"
              value={data.author}
              onChange={(e) => handleForm(e, "author")}
            />
          ) : (
            <h6 className="text-dark">Author: {book.author}</h6>
          )}
          {/*description*/}
          <Card.Text className="text-secondary text-justify">
            {edit ? (
              <FormControl
                className="mt-2"
                as="textarea"
                aria-label="With textarea"
                value={data.description}
                style={{ height: "300px" }}
                onChange={(e) => handleForm(e, "description")}
              />
            ) : (
              book.description.substr(0, 150)
            )}
          </Card.Text>
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
                    title: book.title,
                    description: book.description,
                    harga: book.harga,
                    status: book.status,
                    author: book.author,
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
        </Card.Body>
      </Card>
    </div>
  );
};
export default withRouter(Book);