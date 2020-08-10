import React from "react";
import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";

const Order = ({ order }) => {
  return (
    <div>
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
          <LinkContainer
            to={`/user/order/${order&&order.id}`}
            style={{ cursor: "pointer" }}
          >
            <tr>
              <td>{order&&order.id}</td>
              <td>{order&&order.orders_detail[0]&&order.orders_detail[0].title}</td>
              <td>{order&&order.orders_detail[0]&&order.orders_detail[0].quantity}</td>
              <td>{`Rp ${numeral(order&&order.orders_detail[0]&&order.orders_detail[0].harga).format(
                "0,0"
              )}`}</td>
              <td>{`Rp ${numeral(order&&order.orders_detail[0]&&order.orders_detail[0].total).format(
                "0,0"
              )}`}</td>
            </tr>
          </LinkContainer>
        </tbody>
      </Table>
    </div>
  );
};
export default withRouter(Order);
