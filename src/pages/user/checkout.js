import React, { useEffect, useState } from "react";
import {
  getListCart,
  updateCart,
  deleteCart,
  addOrder,
} from "../../store/actions";
import { connect } from "react-redux";
import JwtDecode from "jwt-decode";
import { Redirect } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { token } from "../../utils/globals";
import Header from "../../components/headerAdmin";
import Footer from "../../components/footer";
import Checkouts from "../../components/checkout";

const mapDispatchToProps = (dispatch) => {
  return {
    getListCart: (uid) => dispatch(getListCart(uid)),
    updateCart: (id, uid, quantity, total) =>
      dispatch(updateCart(id, uid, quantity, total)),
    deleteCart: (id, uid) => dispatch(deleteCart(id, uid)),
    addOrder: (data) => dispatch(addOrder(data)),
  };
};
const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page CategoryPage mapStateToProps");
  return {
    cart: state.cart.items,
  };
};

const Checkout = (props) => {
  const [goto, setGoto] = useState(false);
  const { cart, history, getListCart, updateCart, deleteCart } = props;
  const arrayTotal = cart && cart.map((val) => val.total);
  const grandTotal = arrayTotal.reduce((prev, next) => prev + next, 0);
  const delAllCart = () => {
    cart && cart.map((val) => deleteCart(val.id, JwtDecode(token).id));
  };

  const handleUpdate = (id, quantity, total, e) => {
    e.preventDefault();
    updateCart(id, JwtDecode(token).id, quantity, total);
  };
  const handleDelete = (id, e) => {
    e.preventDefault();
    deleteCart(id, JwtDecode(token).id);
  };
  const handleOrder = async (e) => {
    const data = {
      user_id: JwtDecode(token) && JwtDecode(token).id,
      total: grandTotal,
      orders_detail:
        cart &&
        cart.map((val) => ({
          buku_id: val.buku_id,
          title: val.title,
          quantity: val.quantity,
          harga: val.harga,
          total: val.total,
        })),
    };
    addOrder(data);
    delAllCart();
    alert("The Book is ordered, and will be shipped tomorrow!");
    setGoto(true);
    e.preventDefault();
  };
  useEffect(() => {
    if (!(token && JwtDecode(token) && JwtDecode(token).role_id === 2)) {
      window.localStorage.removeItem("token");
      history.push("/login");
    }
  }, [history]);
  useEffect(() => {
    if (cart) {
      getListCart(JwtDecode(token).id);
    }
  }, [getListCart]);

  return (
    <div className="main-wrapper">
      {goto ? <Redirect to="/user/book" /> : ""}
      <div>
        <Header />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Tombol</th>
            </tr>
          </thead>

          <tbody>
            {cart &&
              cart.map((val, key) => {
                return (
                  <Checkouts
                    key={key}
                    doUpdate={handleUpdate}
                    doDelete={handleDelete}
                    cart={val}
                  />
                );
              })}
            <tr>
              <td colspan="3">Total Pembayaran</td>
              <td>{grandTotal}</td>
            </tr>
          </tbody>
          <Button variant="success" onClick={() => handleOrder()}>
            Checkout
          </Button>
        </Table>
        <Footer />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
