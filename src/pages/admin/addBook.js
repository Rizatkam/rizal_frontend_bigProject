import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addBook } from "../store/actions";

const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page addBook mapStateToProps");
  return {
    books: state.books.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (data) => dispatch(addBook(data)),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      registerUser: (name, email, password) =>
        dispatch(registerUser(name, email, password)),
    };
  };
  
  const Register = (props) => {
    console.log(props,"ini props dari Register.")
    const [goto, setGoto] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [name, setName] = useState("");
    
    const onSubmitSignup = (e) => {
      e.preventDefault();
      props.registerUser(
        name,
        email,
        password,
      );}
  return (
    <div className="main-wrapper">
      {goto ? <Redirect to="/login" /> : ""}
      <div>
        <Form onSubmit={(e) => onSubmitSignup(e)}>
          <Form.Row>
            <Form.Group controlId="formGridName">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Re-Type Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Type Password"
                onChange={(e) => setRetypePassword(e.target.value)}
                value={retypePassword}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            This page is protected by reCAPTCHA, and subject to the Google
            Privacy Policy and Terms of service
          </Form.Row>
          <Form.Row>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form.Row>
          <Form.Row>
            <Link to="https://www.google.com/">
              <Button as={Col} variant="outline-dark" type="link">
                Sign up with Google
              </Button>
            </Link>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
