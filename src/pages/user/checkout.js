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
    updateCart: (id, quantity) => dispatch(updateCart(id, quantity)),
    deleteCart: (id) => dispatch(deleteCart(id)),
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
  const [data, setData] = useState({});
  const { cart, history, getListCart, updateCart, deleteCart } = props;
  const handleUpdate = (id, qty) => {
    updateCart(id, qty);
  };
  const handleDelete = (id) => {
    deleteCart(id);
  };
  const handleOrder = (id) => {
    addOrder(data);
    deleteCart(id);
  };
  useEffect(() => {
    if (!(token && JwtDecode(token) && JwtDecode(token).role_id === 1)) {
      window.localStorage.removeItem("token");
      history.push("/login");
    } else {
      setData({
        user_id: JwtDecode(token) && JwtDecode(token).id,
        total: cart && cart.map(), //Cara Jumlahinnya Gimana?
        orders_detail:
          cart &&
          cart.map((val) => {
            return {
              buku_id: val.buku_id,
              title: val.title,
              quantity: val.quantity,
              harga: val.harga,
              total: val.total,
            };
          }),
      });
      getListCart(JwtDecode(token).id);
    }
  }, [history, getListCart]);

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
              return (
                <tr key={key}>
                  <td>{val && val.title}</td>
                  <td>
                    <input
                      value={val && val.quantity}
                      onChange={
                        () => handleUpdate()
                        //Gimana Caranya masukkin qty nya
                      }
                    />
                  </td>
                  <td>{`Rp ${numeral(val && val.harga).format("0,0")}`}</td>
                  <td>{`Rp ${numeral(val && val.total).format("0,0")}`}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(val.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>Total Pembayaran</td>
            <td>{data && data.total}</td>
          </tr>
        </tbody>
        <Button
          variant="success"
          onClick={
            () => handleOrder()
            //Masukkin ID nya gimana?
          }
        >
          Checkout
        </Button>
      </Table>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
