import React, { useEffect } from "react";
import { connect } from "react-redux";
import { token } from "../../utils/globals";
import { getListOrder } from "../../store/actions";
import Footer from "../../components/footer";
import Order from "../../components/orderAdmin";
import Header from "../../components/headerAdmin";
import { Table } from "react-bootstrap";

const mapDispatchToProps = (dispatch) => {
  return {
    getListOrder: () => dispatch(getListOrder()),
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
  const { user, orders, history, getListOrder } = props;
  useEffect(() => {
    if (!(user && user.user && user.user.role_id === 1 && token)) {
      history.push("/login");
    }
    getListOrder();
  }, [user, history, getListOrder]);
  return (
    <div>
      <Header />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Nama Pelanggan</th>
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
