import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

const Category = ({ category, doUpdate, doDelete }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const handleUpdate = (id) => {
    doUpdate(id, data);
    setEdit(false);
  };
  const handleDelete = (id) => {
    doDelete(id);
  };
  useEffect(() => {
    if (category) {
      setData({
        name: category.name,
      });
    }
  }, [category]);
  return (
    <tr>
      <td>{category && category.id}</td>
      {edit ? (
        <td>
          <input
            value={data.name}
            onChange={(e) => setData({ name: e.target.value })}
          />
        </td>
      ) : (
        <td>{category && category.name}</td>
      )}
      {edit ? (
        <div>
          <Button variant="primary" onClick={(e) => handleUpdate(category.id)}>
            Save
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => {
              setEdit(false);
              setData({ name: category.name });
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
