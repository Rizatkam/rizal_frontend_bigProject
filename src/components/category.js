import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const Category = ({ category, doUpdate, doDelete }) => {
  const [edit, setEdit] = useState(false);
  const [nama, setName] = useState("");
  const handleUpdate = (id, nama) => {
    doUpdate(id, nama);
    setEdit(false);
  };
  const handleDelete = (id) => {
    doDelete(id);
  };
  return (
    <tr>
      <td>{category && category.id}</td>
      {edit ? (
        <td>
          <input value={nama} onChange={(e) => setName(e.target.value)} />
        </td>
      ) : (
        <td>{category && category.name}</td>
      )}
      {edit ? (
        <div>
          <Button
            variant="primary"
            onClick={(e) => handleUpdate(category.id, nama)}
          >
            Save
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <td>
          <Button variant="success" onClick={() => setEdit(true)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={() => handleDelete(category.id)}>
            Delete
          </Button>
        </td>
      )}
    </tr>
  );
};
export default withRouter(Category);
