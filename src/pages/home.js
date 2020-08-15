import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import numeral from "numeral";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { getListBook } from "../store/actions";
import { LinkContainer } from "react-router-bootstrap";
import { ENDPOINT, role } from "../utils/globals";

const mapStateToProps = (state) => {
  return {
    books: state.books.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListBook: () => dispatch(getListBook()),
  };
};

const Home = (props) => {
  const { books, getListBook, history } = props;

  useEffect(() => {
    if (role) {
      role === 1 ? history.push("/admin/book") : history.push("/user/book");
    } else {
      history.push("/");
    }
    getListBook();
  }, [history, getListBook]);

  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <Carousel as={Col}>
          {books &&
            books.map((val, key) => (
              <LinkContainer
                to={`/user/book/${val.id}`}
                style={{ cursor: "pointer" }}
              >
                <Carousel.Item key={key}>
                  <img
                    className="d-block w-100"
                    src={`${ENDPOINT}${val.image_url}`}
                    alt={val.title}
                  />
                  <Carousel.Caption>
                    <h1>{`Rp ${numeral(val.harga).format("0,0")}`}</h1>
                  </Carousel.Caption>
                </Carousel.Item>
              </LinkContainer>
            ))}
        </Carousel>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
