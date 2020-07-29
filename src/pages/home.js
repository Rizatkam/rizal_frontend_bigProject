import React,{useEffect} from 'react';
import Header from '../components/user/header';
import { Container,Row,Col,Carousel } from 'react-bootstrap';
import { connect } from "react-redux";
import { addToCart,getListBook } from "../store/actions";

// import Layout from "../templates/layout";
// import CardBuku from "../components/card/cardBuku";
// import CardBukuAlt from "../components/card/cardBukuAlt";
// import Button from "../components/button/mainButton";

const mapStateToProps = (state) => {
  return {
    books: state.books,
    // addedItems: state.addedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: () => dispatch(getListBook()),
    addToCart: (id) => {dispatch(addToCart(id));
    },
  };
};

const Home=(props)=>{
  const { books, items } = props;

  useEffect(() => {
    props.getBook();
  }, []);

  const handleAddCart = (id) => {
    props.addToCart(id);
  };
    return(
<Container>
<Row>
    <Header/>
</Row>
<Row>
<Carousel as={Col}>
      <Carousel.Item>
        <img
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1355731828l/17086390.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1355731828l/17086390.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1355731828l/17086390.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
</Row>
{/* <Row>
            {books &&
              books.slice(0, 2).map((val) => {
                console.log(val, "ini vaal");
                return (
                  <Col lg={3}>
                    <CardBuku dataCard={val} />
                  </Col>
                );
              })}
            {items &&
              items.slice(0, 2).map((val) => {
                return (
                  <Col lg={3}>
                    <CardBukuAlt dataCard={val} doAddToCart={handleAddCart} />
                  </Col>
                );
              })}
          </Row> */}
</Container>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);