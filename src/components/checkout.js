import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const Checkout = ({ cart, doUpdate, doDelete }) => {
  const [quantity, setQty] = useState(0);
  useEffect(() => {
    if (cart) {
      setQty(cart.quantity);
    }
  }, [cart]);
  const handleUpdate = (id, total) => {
    doUpdate(id, parseInt(quantity), total);
  };
  const handleDelete = (id) => {
    doDelete(id);
  };
  return (
    <tr>
      {console.log(cart, "ini cart di return")}
      <td>{cart && cart.title}</td>
      <td>
        <input value={quantity} onChange={(e) => setQty(e.target.value)} />
      </td>
      <td>{cart && cart.harga}</td>
      <td>{cart && cart.total}</td>
      <td>
        <Button
          variant="success"
          onClick={() => handleUpdate(cart.id, quantity * cart.harga)}
        >
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
