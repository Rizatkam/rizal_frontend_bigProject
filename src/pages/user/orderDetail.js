import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { role } from "../../utils/globals";
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
    order: state.orders.order,
  };
};
const OrderDetailPage = (props) => {
  console.log(props, "ini props order detail");
  const { order, match, history, getOrderById } = props;
  useEffect(() => {
    if (match && match.params && match.params.id) {
      getOrderById(match.params.id);
    }
  }, [match, getOrderById]);
  useEffect(() => {
    if (!(role === 2)) {
      history.push("/login");
      window.localStorage.removeItem("token");
    }
  }, [history]);
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
