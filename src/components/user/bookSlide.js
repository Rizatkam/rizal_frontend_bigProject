import React from "react";
import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";
import { ENDPOINT } from "../../utils/globals";

const BookSlide = ({ book }) => {
  return (
    <Carousel>
    <LinkContainer to={`/user/book/${book.id}`} style={{ cursor: "pointer" }}>
      <Carousel.Item>
        <img className="d-block w-100" src={`${ENDPOINT}${book.image_url}`} alt={book.title} />
        <Carousel.Caption>
          <h1>{`Rp ${numeral(book.harga).format("0,0")}`}</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </LinkContainer>
    </Carousel>
  );
};
export default withRouter(BookSlide);
