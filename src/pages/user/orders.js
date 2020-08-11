import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { access_token } from "../../utils/globals";
import { getListOrder } from "../../store/actions";
import Header from "../../components/headerUser";
import Footer from "../../components/footer";
import Order from "../../components/orderUser";
import { Table } from "react-bootstrap";

const mapDispatchToProps = (dispatch) => {
  return {
    getListOrder: (params) => dispatch(getListOrder(params)),
  };
};
const mapStateToProps = (state) => {
  console.log(state, "ini state di page orders");
  return {
    user: state.users,
    orders: state.orders.orders,
  };
};
const OrderPage = (props) => {
  const [params, setParams] = useState({});
  const { user, orders, history, getListOrder } = props;
  useEffect(() => {
    if (user && user.user && user.user.id) {
      setParams({ user_id: user.user.id });
      getListOrder(params);
    }
    if (!(user && user.user && user.user.role_id === 2 && access_token)) {
      history.push("/login");
    }
    getListOrder(params);
  }, [user, history, getListOrder]);

  return (
    <div>
      <Header />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Title</th>
            <th>Qty.</th>
            <th>Price</th>
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
