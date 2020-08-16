import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const Checkout = ({ cart, doUpdate, doDelete }) => {
  const handleUpdate = (id, qty) => {
    doUpdate(id, qty);
  };
  const handleDelete = (id) => {
    doDelete(id);
  };
  return (
    <tr>
      <td>{cart && cart.title}</td>
      <td>
        <input value={cart && cart.quantity} onChange={() => handleUpdate()} />
      </td>
      <td>{cart && cart.harga}</td>
      <td>{cart && cart.total}</td>
      <td>
        <Button variant="success" onClick={() => handleUpdate(cart.id)}>
          Save
        </Button>
        <Button variant="danger" onClick={() => handleDelete(cart.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default withRouter(Checkout);
