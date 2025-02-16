import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import logo from "../assets/images/logo_tempest_gaming.png";
import { Link } from "react-router-dom";

const Header=()=> {
  return (
    <div>
    <Navbar bg="light" expand="lg" className="navbar-shadow" style={{padding: '10px', paddingTop: '8px'}}>
      <Container>
      <Image src={logo} roundedCircle width={80} height={80} />
        <Navbar.Brand href="#home">
          <h1 style={{fontSize: 30}}>Tempest Gaming</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav"/>
        <Nav className="me-auto">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/console" className="nav-link">Console</Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;
