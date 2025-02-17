import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";

import logo from "../assets/images/logo_tempest_gaming.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        className="navbar-shadow"
        style={{ padding: "10px", paddingTop: "8px" }}
      >
        <Container>
          <Image src={logo} roundedCircle width={80} height={80} />
          <Link to="/home" className="nav-link">
            <h1 style={{ fontSize: 30 }}>Tempest Gaming</h1>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
            </Row>
          </Form>
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/console" className="nav-link">
              Console
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
