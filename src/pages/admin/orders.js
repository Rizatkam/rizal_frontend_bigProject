import React, { useEffect } from "react";
import { connect } from "react-redux";
import { access_token } from "../../utils/globals";
import { getListOrder } from "../../store/actions";
import Footer from "../../components/footer";
import Order from "../../components/orderAdmin";
import Header from "../../components/headerAdmin";

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
    // if (!(user && user.user && user.user.role_id === 1 && access_token)) {
    //   history.push("/login");
    // }
    getListOrder();
  }, [user, getListOrder]);
  return (
    <div>
      <Header />
      {orders && orders.map((val, key) => <Order key={key} order={val} />)}
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
