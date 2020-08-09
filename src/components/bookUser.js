import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";
import { ENDPOINT } from "../utils/globals";

const Book = ({ book }) => {
  const status = book.status_id === 1 ? "info" : "warning";
  return (
    <div className="col-md-3">
      <Card>
        <LinkContainer
          to={`/user/book/${book.id}`}
          style={{ cursor: "pointer" }}
        >
          <Card.Img variant="top" src={`${ENDPOINT}${book.image_url}`} />
        </LinkContainer>
        <Card.Body>
          <Card.Title className="text-primary">{book.title}</Card.Title>
          <Button variant={status} className="btn-sm font-weight-bold m-2">
            {book.status.name}
          </Button>
          <h4 className="font-weight-bold" style={{ color: "#8052ff" }}>
            {`Rp ${numeral(book.harga).format("0,0")}`}
          </h4>
          <h6 className="text-dark">Author: {book.author}</h6>
        </Card.Body>
      </Card>
    </div>
  );
};
export default withRouter(Book);
