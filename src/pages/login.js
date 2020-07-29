import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
  return { login: state.user }
}
const mapDispatchToProps = (dispatch) => {
  return { isLogin: (data) => dispatch({ type: "[USER] LOGIN_USER", data }) }
}

const Login = ({ login }) => {
  const [goto, setGoto] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitSignin = (e) => {
    if (email === login.email && password === login.password) 
    {
      if(users.role_id == 1){
        goto ? (<Redirect to ='/admin/book'/>) : ''
     }else {
         goto ? (<Redirect to ='/user/book'/>) : ''
     }
     setGoto(true)}
    else { alert('Anda gagal login. Email dan/atau Password salah,')}
  }
  
  return (
    <div className="main-wrapper">
    {/* {goto ? (<Redirect to='/book' />) : ''} */}
    <div>
    <Form onSubmit={(e) => onSubmitSignin(e)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
        </Button>
    </Form>
    </div></div>
  )
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login)