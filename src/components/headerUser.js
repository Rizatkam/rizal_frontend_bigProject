import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
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
          to="/"
          style={{ cursor: "pointer" }}
        >
          <Nav.Link >Home</Nav.Link>
          </LinkContainer>

          <LinkContainer
          to="/user/order"
          style={{ cursor: "pointer" }}
        >
          <Nav.Link>Orderan Kamu</Nav.Link>
          </LinkContainer>

          <LinkContainer
          to="/"
          style={{ cursor: "pointer" }}>
          <Button onClick={logout}>Logout</Button>
          </LinkContainer>
        </Nav>
        <Form inline>
          <Form.Control placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
