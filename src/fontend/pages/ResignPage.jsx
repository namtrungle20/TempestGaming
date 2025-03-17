import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../assets/images/logo_tempest_gaming.png";
import Backgroud from "../assets/images/backgroudMP4.mp4";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../styles/ResignPage.css";

function ResignPage(props) {
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
              <Form.Group controlId="formBasicEmail" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-2">
                <Form.Label>Mật Khẩu</Form.Label>
                <Form.Control type="password" placeholder="Nhập Mật Khẩu" />
              </Form.Group>

              <Form.Group controlId="formBasicPasswordConfirm" className="mb-2">
                <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                <Form.Control type="password" placeholder="Xác Nhận Mật Khẩu" />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Link to={"/home"} className="text-center">
                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Đăng Ký
                </Button>
              </Link>
              <Link to={"/login"} className="text-center">
                <p>Đã có tài khoản? Đăng nhập ngay</p>
              </Link>
            </Form>
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

export default ResignPage;
