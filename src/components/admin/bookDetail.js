// Belum Diseuaikan
import React, { useState, useEffect } from 'react';
import { Card,Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import numeral from 'numeral';

const BookDetail = ({ book, doUpdate, doDelete }) => {
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

      return (
        <div className="App">
        <div className="container">
          <Card className="pl-o p-5">
            <div className="row">
              <div className="col-md-3">
                <LinkContainer to="/book" style={{ cursor: 'pointer' }}>
                  <h2>&larr;</h2>
                </LinkContainer>
              </div>
              <div className="col-md-6">
                <h2 style={{ color: "#8052ff" }}>
                  {book.title}
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <img
                  className="img-fluid"
                  variant="top"
                  alt=""
                  src={book.image}
                  width={450}
                />
              </div>
              <div className="col-md-4">
                <Button
                  variant={bookStatus}
                  className="btn-sm font-weight-bold m-2"
                >
                  {book.bookStatus}
                </Button>
                <h4
                  className="my-2 font-weight-bold"
                  style={{ color: "#8052ff" }}
                >
                  {`Rp ${numeral(book.price).format("0,0")}`}
                </h4>
                <h5 className="my-3 text-dark text-left">
                  Author: {book.authorName}
                </h5>
                <h6 className="text-left">Book Synopsis :</h6>
                <p className="text-black-50 text-justify">{book.synopsis}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>  
);
};
export default withRouter(BookDetail);