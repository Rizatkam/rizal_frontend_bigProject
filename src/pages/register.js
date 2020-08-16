import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../store/actions";
import { token } from "../utils/globals";
import JwtDecode from "jwt-decode";

const mapStateToProps = (state) => {
  console.log(state, "Ini state dari page Register mapStateToProps");
  return {
    user: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (name, email, password) =>
      dispatch(registerUser(name, email, password)),
  };
};

const Register = (props) => {
  console.log(props, "ini props dari Register.");
  const [goto, setGoto] = useState(false);
  const [email, setEmail] = useState("");
  const [warningEmail, setWarningEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warningPassword, setWarningPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [warningRetypePassword, setWarningRetypePassword] = useState("");
  const [name, setName] = useState("");
  const [warningName, setWarningName] = useState("");
  const { registerUser, history } = props;

  const onSubmitSignup = (e) => {
    e.preventDefault();
    registerUser(name, email, password);
    if (
      email.includes("@") &&
      email.length !== 0 &&
      email.length <= 30 &&
      password.length >= 8 &&
      password.length <= 30 &&
      retypePassword === password &&
      name.length !== 0 &&
      name.length <= 48
    ) {
      setGoto(true);
    } else {
      alert("Input Data tidak Valid! Mohon periksa kembali!");
    }
  };
  useEffect(() => {
    if (token && JwtDecode(token) && JwtDecode(token).role_id === 1) {
      history.push("/admin/book");
    } else if (token && JwtDecode(token) && JwtDecode(token).role_id === 2) {
      history.push("/user/book");
    }
  }, [history]);
  useEffect(() => {
    if (!email.includes("@")) setWarningEmail("Ini mah bukan email, Broh!");
    else if (email.length === 0) setWarningEmail("Harus diisi ya!");
    else if (email.length > 30) setWarningEmail("Kepanjangan, Broh!");
    else setWarningEmail("");

    if (password.length < 8) setWarningPassword("Terlalu Sedikit, Cuy!");
    else if (password.length > 30) setWarningPassword("Kepanjangan, Broh!");
    else setWarningPassword("");

    retypePassword !== password
      ? setWarningRetypePassword("Kok beda ya?")
      : setWarningRetypePassword("");

    if (name.length === 0) setWarningName("Harus diisi ya!");
    else if (name.length > 48) setWarningName("Kepanjangan, Broh!");
    else setWarningName("");
  }, [email, password, retypePassword, name]);
  return (
    <div className="main-wrapper">
      {goto ? <Redirect to="/login" /> : ""}
      <div>
        <Form onSubmit={(e) => onSubmitSignup(e)}>
          <h1 className="signup-header">Cilsy</h1>
          <div className="signup">
            <p>
              Cilsy Book Online Store adalah Toko Buku Online dengan koleksi
              buku terbanyak di Indonesia
            </p>
            <div className="signup-form">
              <h3>Sign up</h3>
              <h6>
                atau <Link to="/login">sign in</Link>
              </h6>
              <Form.Row>
                <Form.Group controlId="formGridName">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <div style={{ color: "red" }}>{warningName}</div>
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
                  <div style={{ color: "red" }}>{warningEmail}</div>
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
                  <div style={{ color: "red" }}>{warningPassword}</div>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Re-Type Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-Type Password"
                    onChange={(e) => setRetypePassword(e.target.value)}
                    value={retypePassword}
                  />
                  <div style={{ color: "red" }}>{warningRetypePassword}</div>
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
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
