import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import numeral from "numeral";
import { connect } from "react-redux";
import { ENDPOINT, access_token } from "../../utils/globals";
import { getListOrder} from "../../store/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getListOrder: (params) => dispatch(getListOrder(params)),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.users,
    orders: state.orders.orders,
  };
};
const OrderPage=(props)=>{
return(1)
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);