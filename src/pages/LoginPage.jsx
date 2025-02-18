import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../assets/images/logo_tempest_gaming.png";
import Backgroud from "../assets/images/backgroudMP4.mp4";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage(props) {
  return (
    <div className="d-flex justify-content-md-center align-item-center">
      <video autoPlay muted loop className="backgroud-video">
        <source src={Backgroud} />
      </video>
        <div >
        <Container className="login">
          <Row >
            <Col md="6" className="form-section">
              <Container style={{ width: "100px", justifyContent: "center" }}>
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
            <Col md={6} className="illustration-section">
              <img
                alt="Illustration"
                className="img-fluid"
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </Col>
          </Row>
        </Container>
        </div>
      </div>
  );
}
export default LoginPage;
