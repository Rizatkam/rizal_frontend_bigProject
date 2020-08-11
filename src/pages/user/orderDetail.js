import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { access_token } from "../../utils/globals";
import { getOrderById } from "../../store/actions";
import Header from "../../components/headerUser";
import Footer from "../../components/footer";

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderById: (id, params) => dispatch(getOrderById(id, params)),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.users,
    order: state.orders.order,
  };
};
const OrderDetailPage = (props) => {
  console.log(props, "ini props order detail");
  // const [id, setId] = useState(0);
  // const [params, setParams] = useState({});
  const { user, order, match, history, getOrderById } = props;
  useEffect(() => {
    // if (match && match.params && match.params.id) {
    //   setId(match.params.id);
    // }
    // if (user && user.user && user.user.id) {
    //   setParams({ user_id: user.user.id });
    // }
    getOrderById(match.params.id, { user_id: 8 });
  }, []);
  useEffect(() => {
    if (!(user && user.user && user.user.role_id === 2 && access_token)) {
      history.push("/login");
    }
  }, [user, history]);
  return (
    <div>
      <Header />
      <div>
        <h1>Order Number:</h1>
        <h1>{order && order.id}</h1>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.orders_detail &&
            order.orders_detail.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val && val.title}</td>
                  <td>{val && val.quantity}</td>
                  <td>{`Rp ${numeral(val && val.harga).format("0,0")}`}</td>
                  <td>{val && val.total}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPage);
