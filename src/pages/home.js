import React from 'react';
import Header from '../components/user/header';
import { Container,Row,Col,Carousel } from 'react-bootstrap';

const Home=()=>{
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
</Container>
    )
}
export default Home;