import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import JwtDecode from "jwt-decode";
import { loginUser } from "../store/actions";
import { Redirect } from "react-router-dom";
import { token } from "../utils/globals";

const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page Login mapStateToProps");
  return {
    user: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};

const Login = (props) => {
  console.log(props, "ini props dari page login.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gotoAdmin, setGotoAdmin] = useState(false);
  const [gotoUser, setGotoUser] = useState(false);
  const { loginUser, user, history } = props;
  loginUser(email, password);
  console.log(email, password, "ini email dan password dari page Login.");

  useEffect(() => {
    if (token && JwtDecode(token) && JwtDecode(token).role_id === 1) {
      history.push("/admin/book");
    } else if (token && JwtDecode(token) && JwtDecode(token).role_id === 2) {
      history.push("/user/book");
    }
  }, [history]);

  const onSubmitSignin = (e) => {
    e.preventDefault();
    if (user.isLoggedIn && user.user.role_id === 1) {
      alert("Anda telah Login sebagai Admin.");
      setGotoAdmin(true);
    } else if (user.isLoggedIn && user.user.role_id === 2) {
      alert(`Selamat Datang ${user.user.name}!`);
      setGotoUser(true);
    } else {
      alert("Anda gagal login. Email dan/atau Password salah,");
    }
  };

  return (
    <div className="main-wrapper">
      {gotoAdmin ? <Redirect to="/admin/book" /> : ""}
      {gotoUser ? <Redirect to="/user/book" /> : ""}
      <div>
        <Form onSubmit={(e) => onSubmitSignin(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
