import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container style={{ backgroundColor: "lightorange" }}>
      <Row>
        <Col>
          <h5>Clisy+</h5>
          <ul>
            <li>Tentang Cilsy+</li>
            <li>Karir</li>
            <li>Blog</li>
            <li>Promosi</li>
            <li>Gratis Ongkir</li>
          </ul>
        </Col>
        <Col>
          <h5>Buku</h5>
          <ul>
            <li>Terlaris</li>
            <li>Baru</li>
            <li>Jadul</li>
            <li>Sedang Diskon</li>
          </ul>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <h6>© 2020 Copyright: cilsyplus.com</h6>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;
