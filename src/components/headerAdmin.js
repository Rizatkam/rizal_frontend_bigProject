import React from "react";
import { Navbar, Nav,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
    const logout=()=>{
        window.localStorage.removeItem("user_id")
        window.localStorage.removeItem("role_id")
        window.localStorage.removeItem("token")
    }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">CILSY+</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <LinkContainer
          to="/admin/book"
          style={{ cursor: "pointer" }}
        >
          <Nav.Link >Book List</Nav.Link>
          </LinkContainer>

          <LinkContainer
          to="/admin/addBook"
          style={{ cursor: "pointer" }}>
          <Nav.Link >Add Book</Nav.Link>
          </LinkContainer>

          <LinkContainer
          to="/admin/order"
          style={{ cursor: "pointer" }}
        >
          <Nav.Link>Order dari Pelanggan</Nav.Link>
          </LinkContainer>

          <LinkContainer
          to="/"
          style={{ cursor: "pointer" }}>
          <Button onClick={logout}>Logout</Button>
          </LinkContainer>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;