import React from "react";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import numeral from "numeral";

const Order = ({ order }) => {
  return (
    <div>
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
            {order &&
              order.orders_detail.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{order && order.customers_detail&&order.customers_detail.id}</td>
                    <td>{order && order.customers_detail&&order.customers_detail.name}</td>
                    <td>{order && order.id}</td>
                    <td>{val.title}</td>
                    <td>{val.quantity}</td>
                    <td>{`Rp ${numeral(val.harga).format("0,0")}`}</td>
                    <td>{`Rp ${numeral(val.total).format("0,0")}`}</td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </div>
  );
};
export default withRouter(Order);