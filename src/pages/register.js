import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


const mapDispatchToProps = (dispatch) => {
  return { register: (data) => dispatch({ type:"[USER] ADD_USER", data }) }
}

const Register = (props) => {
  const [goto, setGoto] = useState(false)
  const [email, setEmail] = useState('')
  const [warningEmail, setWarningEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningPassword, setWarningPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [warningRetypePassword, setWarningRetypePassword] = useState('')
  const [nama, setNama] = useState('')
  const [warningNama, setWarningNama] = useState('')
  const onSubmitSignup = (e) => {
    e.preventDefault();
    props.register({
      email,
      password,
      retypePassword,
      nama,
    });
    if (
      email.includes("@") &&
      email.length >= 8 &&
      email.length <= 30 &&
      password.length >= 8 &&
      password.length <= 30 &&
      retypePassword === password &&
      nama.length !== 0 &&
      nama.length <= 15
    ) { setGoto(true) } else { alert("Input Data tidak Valid! Mohon periksa kembali!") }
  }
  useEffect(() => {

    if (!email.includes("@")) setWarningEmail("Ini mah bukan email, Broh!");
    else if (email.length < 8) setWarningEmail("Terlalu Sedikit, Cuy!");
    else if (email.length > 30) setWarningEmail("Kepanjangan, Broh!");
    else (setWarningEmail(""))

    if (password.length < 8) setWarningPassword("Terlalu Sedikit, Cuy!");
    else if (password.length > 30) setWarningPassword("Kepanjangan, Broh!");
    else (setWarningPassword(""))

    retypePassword !== password ? setWarningRetypePassword("Kok beda ya?")
      : setWarningRetypePassword("");

    if (nama.length === 0) setWarningNama("Harus diisi ya!");
    else if (nama.length > 15) setWarningNama("Kepanjangan, Broh!");
    else (setWarningNama(""))

  }, [
    email,
    password,
    retypePassword,
    nama,
  ])
  return (
    <div className="main-wrapper">
      {goto ? (<Redirect to='/login' />) : ''}
      <div>
        <Form onSubmit={(e) => onSubmitSignup(e)}>
          <h1 className="signup-header">Cilsy</h1>
          <div className="signup">
            <p>Cilsy Book Online Store adalah Toko Buku Online dengan koleksi buku terbanyak di Indonesia</p>
            <div className="signup-form" >
              <h3>Sign up</h3>
              <h6>atau <Link to="/login">sign in</Link></h6>
              <Form.Row>
                <Form.Group controlId="formGridName">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control onChange={(e) => setNama(e.target.value)} value={nama} />
                  <div style={{ color: 'red' }}>{warningNama}</div>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                  <div style={{ color: 'red' }}>{warningEmail}</div>
                </Form.Group>
              </Form.Row>
              
              <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} value={password} />
                <div style={{ color: 'red' }}>{warningPassword}</div>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Re-Type Password</Form.Label>
                <Form.Control type="password" placeholder="Re-Type Password"
                  onChange={(e) => setRetypePassword(e.target.value)} value={retypePassword} />
                <div style={{ color: 'red' }}>{warningRetypePassword}</div>
              </Form.Group>
              </Form.Row>
            <Form.Row>This page is protected by reCAPTCHA, and subject to the Google
      Privacy Policy and Terms of service</Form.Row>
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
          </div></div>
        </Form>
    </div></div>
  )
}

export default connect(null, mapDispatchToProps)(Register)