import React from 'react';
import { Container,Col,Row,InputGroup,FormControl,Dropdown,Button,ButtonGroup,Tabs,Tab } from 'react-bootstrap';
import { Link} from 'react-router-dom';

const Header =()=>{
    return(
      <Container className="header">
      <Row>
      <Col>Logo Toko Buku</Col>
      <Col>
        <InputGroup className="mb-3">
        <FormControl
          placeholder="Cari Buku"
          aria-label="Search Book"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2">
          <Button>
          </Button>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      </Col>
      <Col>
        <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1">Icon-Orang</Dropdown.Toggle>
        <Dropdown.Menu>

  <Dropdown.Header>SELAMAT DATANG</Dropdown.Header>
  
  <Dropdown.Item eventKey="2">
  <Link to="/login">MASUK</Link>
  </Dropdown.Item>
  
  <Dropdown.Item eventKey="3">
  <Link to="/register">BUAT AKUN</Link>
  </Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
</Col>
</Row>
<Row>
<Tabs defaultActiveKey="book">
  <Tab eventKey="bookList" title="SEMUA KOLEKSI BUKU">
    
  </Tab>
  <Tab eventKey="bookList" title="BUKU BARU">
    
  </Tab>
  <Tab eventKey="bookList" title="BUKU PILIHAN">
    
  </Tab>
    <Tab eventKey="bookList" title="NATIONAL BEST SELLER">
    
  </Tab>
  <Tab eventKey="bookList" title="BUKU IMPORT">
    
  </Tab>
  <Tab eventKey="bookList" title="SALE">
    
  </Tab>
</Tabs>
</Row>
</Container>)}
export default Header;