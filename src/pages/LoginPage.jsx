import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../assets/images/logo_tempest_gaming.png";
import Backgroud from "../assets/images/backgroudMP4.mp4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css";

function LoginPage(props) {
  return (
    <div className="login-page">
      <video autoPlay muted loop className="background-video">
        <source src={Backgroud} type="video/mp4" />
      </video>
      <Container className="login-container">
        <Row className="justify-content-center align-items-center">
          <Col md="6" className="form-section">
            <Container className="text-center mb-4">
              <Image src={logo} width={130} height={130} />
            </Container>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="#forgot">Forgot password?</a>
            </div>
            <div className="text-center mt-3">
              <a href="#register">Register</a>
            </div>
            <hr />
            <div className="text-center">
              <Button variant="outline-secondary" className="m-1">
                <i className="bi bi-apple"></i> Apple
              </Button>
              <Button variant="outline-secondary" className="m-1">
                <i className="bi bi-twitter"></i> Twitter
              </Button>
              <Button variant="outline-secondary" className="m-1">
                <i className="bi bi-facebook"></i> Facebook
              </Button>
              <Button variant="outline-secondary" className="m-1">
                <i className="bi bi-google"></i> Google
              </Button>
            </div>
          </Col>
          <Col md="6" className="illustration-section">
            <Image src={logo} className="illustration-image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
