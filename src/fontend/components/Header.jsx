import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/App.css";
import { Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import logo from "../assets/images/logo_tempest_gaming.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-shadow">
      <Container>
        <Link to="/home" className="navbar-brand">
          <Image src={logo} roundedCircle width={110} height={110} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Link to="/console" className="nav-link console-link" style={{fontSize: "1.5rem", paddingLeft: "10"}}>
              Console
            </Link>
          </Nav>
          <Form className="d-flex search-form">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
          </Form>
          <Nav className="align-items-center">
            <Link to="/login" className="nav-link">
              <i className="bi bi-person-fill icon-large"></i>
            </Link>
            <Link to="/console" className="nav-link">
              <i className="bi bi-cart-fill icon-large"></i>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
