import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../store/actions";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.users.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};

const Login = ( props ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitSignin = (e) => {
    e.preventDefault()
    props.loginUser(email, password);
    //       if (email === data.user.email && password === data.user.password)
    //     {
    //       if(data.user.role_id == 1){
    //         <Redirect to ='/admin/book'/>
    //      }else {
    //       <Redirect to ='/user/book'/>
    //      }}
    //     else { alert('Anda gagal login. Email dan/atau Password salah,')}
    }

    // useEffect(() => {
    //   if(userData){
    //       window.location.href = '/'
    //   }
    // },[])

    return (
      <div className="main-wrapper">
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
