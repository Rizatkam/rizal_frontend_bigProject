import React, { useState, useEffect } from "react";
import { Card, Button, FormControl } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { ENDPOINT, access_token } from "../../utils/globals";
import { getBookById, addOrder } from "../../store/actions";
import Header from "../../components/header";
import Footer from "../../components/footer";

const mapDispatchToProps = (dispatch) => {
  return {
    getBookById: (id) => dispatch(getBookById(id)),
    addOrder: (data) => dispatch(addOrder(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    book: state.books.book,
    user: state.users,
    order: state.orders.order,
  };
};

const BookDetailPage = (props) => {
  const [qty, setQty] = useState(1);
  const [data, setData] = useState({});
  const [variant, setVariant] = useState("");
  const { book, user, match, history, getBookById } = props;

  useEffect(() => {
    if (match && match.params && match.params.id) {
      getBookById(match.params.id);
    }
  }, [match, getBookById]);
  useEffect(() => {
    if (book) {
      setVariant(book.status_id === 1 ? "info" : "warning");
    }
  }, [book]);
  useEffect(() => {
    if (!(user && user.user && user.user.role_id === 2 && access_token)) {
      history.push("/login");
    }
  }, [user]);

  const handleOrder = () => {
    setData({
      user_id: user.user.id,
      total: book.harga * qty,
      orders_detail: [
        {
          buku_id: book.id,
          title: book.title,
          quantity: qty,
          harga: book.harga,
          total: book.harga * qty,
        },
      ],
    });
    addOrder(data);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <Card className="pl-o p-5">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h2 style={{ color: "#8052ff" }}>{book && book.title}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <img
                className="img-fluid"
                variant="top"
                alt=""
                src={`${ENDPOINT}${book.image_url}`}
                width={450}
              />
            </div>
            <div className="col-md-4">
              <Button variant={variant} className="btn-sm font-weight-bold m-2">
                {book.status ? book.status.name : null}
              </Button>
              <h3 style={{ color: "#8052ff" }}>
                {book.kategori ? book.kategori.name : null}
              </h3>
              <h4
                className="my-2 font-weight-bold"
                style={{ color: "#8052ff" }}
              >
                {`Rp ${numeral(book && book.harga).format("0,0")}`}
              </h4>
              <h5 className="my-3 text-dark text-left">
                Author: {book && book.author}
              </h5>

              <h6 className="my-3 text-dark text-left">
                ISBN Number: {book && book.no_isbn}
              </h6>
              <h6>Weight:{book && book.berat}</h6>
              <p className="text-black-50 text-justify">
                {book && book.description}
              </p>
            </div>
          </div>
          <FormControl
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <div>
            <Button variant="danger" onClick={() => handleOrder()}>
              Order
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
