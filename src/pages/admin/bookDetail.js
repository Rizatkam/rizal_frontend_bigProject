import React from 'react';
import '../../App.css';
import {
  Card,
  Button
} from 'react-bootstrap';
import numeral from 'numeral';
import { LinkContainer } from 'react-router-bootstrap';
import { ENDPOINT } from "../../utils/globals";

const BookDetailPage = (props) => {
  const book = {
    id: 5,
    title: 'ini judul',
    isbn: 'null',
    authorName: 'ini author',
    synopsis: 'ini sinopsis',
    price: 84000.0,
    status: 'OUT_OF_STOCK',
  }

  const status = book.status === 'FOR_SELL' ? 'info' : 'warning';

  return (
    <div className="App">
      <div className="container">
        <Card className="pl-o p-5">
          <div className="row">
            <div className="col-md-3">
              <LinkContainer to="/" style={{ cursor: 'pointer' }}>
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
                src={`${ENDPOINT}/${book.image_url}`}
                width={450}
              />
            </div>
            <div className="col-md-4">
              <Button
                variant={status}
                className="btn-sm font-weight-bold m-2"
              >
                {book.status}
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
  )
};

export default BookDetailPage;