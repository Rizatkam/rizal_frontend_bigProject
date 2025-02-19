import React, { useEffect, useState } from "react";
import {
  getListCategory,
  updateCategory,
  deleteCategory,
  addCategory,
} from "../../store/actions";
import { connect } from "react-redux";
import JwtDecode from "jwt-decode";
import { Table, Form, Button } from "react-bootstrap";
import { token } from "../../utils/globals";
import Header from "../../components/headerAdmin";
import Footer from "../../components/footer";
import Category from "../../components/category";

const mapDispatchToProps = (dispatch) => {
  return {
    getListCategory: () => dispatch(getListCategory()),
    updateCategory: (id, data) => dispatch(updateCategory(id, data)), //Masih Gagal
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    addCategory: (name) => dispatch(addCategory(name)),
  };
};
const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page CategoryPage mapStateToProps");
  return {
    categories: state.categories.categories,
  };
};

const Categories = (props) => {
  const [name, setName] = useState("");
  const {
    categories,
    history,
    getListCategory,
    updateCategory,
    deleteCategory,
    addCategory,
  } = props;
  const handleUpdate = (id, data) => {
    updateCategory(id, data);
    alert("Category has been updated!");
  };
  const handleDelete = (id) => {
    deleteCategory(id);
    alert("Category has been deleted!");
  };
  const onSubmitAddCategory = (e) => {
    addCategory(name);
    alert("Category has been added!");
    e.preventDefault();
  };
  useEffect(() => {
    if (!(token && JwtDecode(token) && JwtDecode(token).role_id === 1)) {
      window.localStorage.removeItem("token");
      history.push("/login");
    }
    getListCategory();
  }, [history, getListCategory]);
  useEffect(() => {
    if (categories) {
      setName(categories.name);
    }
  }, [categories]);
  return (
    <div>
      <Header />
      <Form onSubmit={(e) => onSubmitAddCategory(e)}>
        <Form.Row>
          <Form.Control
            placeholder="Add New Category Here!"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Row>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nama</th>
            <th>Tombol</th>
          </tr>
        </thead>

        <tbody>
          {categories &&
            categories.map((val, key) => (
              <Category
                key={key}
                category={val}
                doUpdate={handleUpdate}
                doDelete={handleDelete}
              />
            ))}
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
