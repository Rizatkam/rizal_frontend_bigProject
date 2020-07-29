// Belum Disesuaikan (Modul Halaman 41)
import React,{useEffect} from 'react';
import {
  Card,
  Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getBookById} from '../../store/actions'
import numeral from 'numeral';
import { LinkContainer } from 'react-router-bootstrap';

const BookDetailPage = (props) => {
    const {id} = props.match.params;
    const {book}=props;
    const bookStatus = book.bookStatus === 'FOR_SELL' ? 'info' : 'warning';

    useEffect(()=>{props.getBookById(id);},[]);
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
                src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
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
  )
};
const mapStateToProps=(state)=>{
    return{books: state.bookReducer.book}
  }
  const mapDispatchToProps=(dispatch)=>{
    return{getBookById:(id)=>dispatch(getBookById(id))}
  }

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);