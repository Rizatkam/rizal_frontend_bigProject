import React, { useEffect, useState } from "react";
import {
  getListCart,
  updateCart,
  deleteCart,
  addOrder,
} from "../../store/actions";
import numeral from "numeral";
import { connect } from "react-redux";
import JwtDecode from "jwt-decode";
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
  const { cart, history, getListCart, updateCart, deleteCart } = props;
  const arrayTotal = cart && cart.map((val) => val.total);
  const grandTotal = arrayTotal.reduce((prev, next) => prev + next, 0);
  const delAllCart = () => {
    cart && cart.map((val) => deleteCart(val.id, JwtDecode(token).id));
  };

  const handleUpdate = (id, quantity, total) => {
    console.log(total, "ini total di page checkout");
    updateCart(id, JwtDecode(token).id, quantity, total);
  };
  const handleDelete = (id) => {
    deleteCart(id, JwtDecode(token).id);
  };
  const handleOrder = async () => {
    //Alert untuk konfirmasi Pembelian dan redirect
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
          {/* {cart &&
            cart.map((val, key) => (
              <Checkouts
                key={key}
                category={val}
                doUpdate={handleUpdate}
                doDelete={handleDelete}
              />
            ))} */}
          {cart &&
            cart.map((val, key) => {
              // return (
              //   <tr key={key}>
              //     <td>{val && val.title}</td>
              //     <td>
              //       <input
              //         value={val && val.quantity}
              //         onChange={
              //           () => handleUpdate()
              //           //Gimana Caranya masukkin qty nya
              //         }
              //       />
              //     </td>
              //     <td>{`Rp ${numeral(val && val.harga).format("0,0")}`}</td>
              //     <td>{`Rp ${numeral(val && val.total).format("0,0")}`}</td>
              //     <td>
              //       <Button
              //         variant="danger"
              //         onClick={() => handleDelete(val.id)}
              //       >
              //         Delete
              //       </Button>
              //     </td>
              //   </tr>
              // );
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
