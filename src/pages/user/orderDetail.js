import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { ENDPOINT, access_token } from "../../utils/globals";
import { getOrderById } from "../../store/actions";
import Header from "../../components/header";
import Footer from "../../components/footer";

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderById: (id, params) => dispatch(getOrderById(id, params)),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.users,
    order: state.orders.order,
  };
};
const OrderPage = (props) => {
  return 1;
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
