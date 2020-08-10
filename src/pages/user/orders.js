import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { access_token } from "../../utils/globals";
import { getListOrder} from "../../store/actions";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Order from "../../components/orderUser"

const mapDispatchToProps = (dispatch) => {
  return {
    getListOrder: (params) => dispatch(getListOrder(params)),
  };
};
const mapStateToProps = (state) => {
  console.log(state,"ini state di page orders")
  return {
    user: state.users,
    orders: state.orders.orders,
  };
};
const OrderPage=(props)=>{
  const [params, setParams] = useState({});
  const { user, orders, history, getListOrder } = props;
  useEffect(() => {
    if (user && user.user && user.user.id) {
      setParams({ user_id: user.user.id });
    }
    // if (!(user && user.user && user.user.role_id === 2 && access_token)) {
    //   history.push("/login");
    // }
    getListOrder(params);
  }, [user, getListOrder]);
return( <div>
  <Header />
  {orders && orders.map((val, key) => <Order key={key} order={val} />)}
  <Footer />
</div>)
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);