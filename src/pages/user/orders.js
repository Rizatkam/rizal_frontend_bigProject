import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getListOrder } from "../../store/actions";
import Header from "../../components/headerUser";
import Footer from "../../components/footer";
import Order from "../../components/orderUser";
import { Table } from "react-bootstrap";
import { token } from "../../utils/globals";
import JwtDecode from "jwt-decode";

const mapDispatchToProps = (dispatch) => {
  return {
    getListOrder: (uid) => dispatch(getListOrder(uid)),
  };
};
const mapStateToProps = (state) => {
  console.log(state, "ini state di page orders");
  return {
    orders: state.orders.orders,
  };
};
const OrderPage = (props) => {
  const { orders, history, getListOrder } = props;
  useEffect(() => {
    if (!(token && JwtDecode(token) && JwtDecode(token).role_id === 2)) {
      window.localStorage.removeItem("token");
      history.push("/login");
    }
    getListOrder(JwtDecode(token) && JwtDecode(token).id);
  }, [history, getListOrder]);

  return (
    <div>
      <Header />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((val, key) => <Order key={key} order={val} />)}
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
