import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";

const Order = ({ order }) => {
  return (
    <LinkContainer
      to={`/admin/order/${order && order.id}`}
      style={{ cursor: "pointer" }}
    >
      {/* {order &&
        order.orders_detail.map((val, key) => {
          return (
            <tr key={key}>
              <td>
                {order && order.customers_detail && order.customers_detail.id}
              </td>
              <td>
                {order && order.customers_detail && order.customers_detail.name}
              </td>
              <td>{order && order.id}</td>
              <td>{val.title}</td>
              <td>{val.quantity}</td>
              <td>{`Rp ${numeral(val.harga).format("0,0")}`}</td>
              <td>{`Rp ${numeral(val.total).format("0,0")}`}</td>
            </tr>
          );
        })} */}
      <tr>
        <td>{order && order.customers_detail && order.customers_detail.id}</td>
        <td>
          {order && order.customers_detail && order.customers_detail.name}
        </td>
        <td>{order && order.id}</td>
        <td>{order.orders_detail[0].title}</td>
        <td>{order.orders_detail[0].quantity}</td>
        <td>{`Rp ${numeral(order.orders_detail[0].harga).format("0,0")}`}</td>
        <td>{`Rp ${numeral(order.orders_detail[0].total).format("0,0")}`}</td>
      </tr>
    </LinkContainer>
  );
};
export default withRouter(Order);
