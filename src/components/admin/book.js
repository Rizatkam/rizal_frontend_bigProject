// Belum Diseuaikan
import React, { useState, useEffect } from 'react';
import { Card,Button,FormControl,Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';

const Book = ({ book, doUpdate, doDelete }) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
    const bookStatus = book.bookStatus === "FOR_SELL" ? "info" : "warning";

    useEffect(() => {
        setData({...book, bookCategory: {...book.bookCategory},
          id: book.id,
          image: book.image,
          title: book.title,
          synopsis: book.synopsis,
          price: book.price,
          bookStatus: book.bookStatus,
          authorName: book.authorName,
          publicationDate: new Date()
        });
      }, []);
      console.log(book.image,"Book.Image")

      const handleUpdate = () => {
        doUpdate(data);
        setEdit(false);
      };
      const handleDelete = (id) => {
        doDelete(id);
      };

      const handleForm = (e,formName) => {
        setData({ ...data, [formName]: e.target.value });
      };

      return (
        <div className="col-md-3">
          <Card>
            <Card.Img
              variant="top"
              src={book.image}
            />
            <Card.Body>
              <LinkContainer to={`/book/${book.id}`} style={{ cursor: 'pointer' }}>
                <Card.Title className="text-primary">{book.title}</Card.Title>
              </LinkContainer>
            {/*status*/}
            {edit ? (
                  <Form.Control
                    as="select"
                    value={data.bookStatus}
                    onChange={(e) => handleForm(e, "bookStatus")}
                  >
                    <option>--Choose--</option>
                    <option value="FOR_SELL">FOR_SELL</option>
                    <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                  </Form.Control>
            ):(
                <Button
                variant={bookStatus}
                className="btn-sm font-weight-bold m-2">
                {book.bookStatus}
              </Button>
            )}
            {/*price*/}
            {edit ? (
                  <FormControl
                    className="mt-2"
                    type="number"
                    as="input"
                    value={data.price}
                    onChange={(e) => handleForm(e, "price")}
                  />
            ):(
            <h4 className="font-weight-bold" style={{ color: "#8052ff" }}>
            {`Rp ${numeral(book.price).format("0,0")}`}
          </h4>)}
       {/*author*/}
        {edit ? (
            <FormControl
                className="mt-2"
                as="input"
                value={data.authorName}
                onChange={(e) => handleForm(e, "authorName")}
              />
        ):(
            <h6 className="text-dark">Author: {book.authorName}</h6>
        )}
        {/*synopsis*/}
        <Card.Text className="text-secondary text-justify">
        {edit ? (
            <FormControl
            className="mt-2"
            as="textarea"
            aria-label="With textarea"
            value={data.synopsis}
            style={{ height: "300px" }}
            onChange={(e) => handleForm(e, "synopsis")}/>
        ) : (
            book.synopsis.substr(0, 150)
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
                synopsis: book.synopsis,
                price: book.price,
                bookStatus: book.bookStatus,
                authorName: book.authorName,
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
            <Button variant="danger" onClick={()=>handleDelete(book.id)}>
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