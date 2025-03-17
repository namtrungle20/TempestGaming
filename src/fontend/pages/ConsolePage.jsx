import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import PS5 from "../assets/images/ps5.png";
import ProductCard from "../components/ProductCard";
import "../styles/ConsolePage.css";

const ConsolePage = () => {
  const product = [
    {
      image: PS5,
      name: "Sản phẩm 1",
      description: "Mô tả ngắn về sản phẩm 1",
      price: "100",
    },
    {
      image: PS5,
      name: "Sản phẩm 2",
      description: "Mô tả ngắn về sản phẩm 2.",
      price: "150",
    },
    {
      image: PS5,
      name: "Sản phẩm 3",
      description: "Mô tả ngắn về sản phẩm 3.",
      price: "200",
    },
    {
      image: PS5,
      name: "Sản phẩm 4",
      description: "Mô tả ngắn về sản phẩm 3.",
      price: "20000",
    },
  ];
  return (
    <div className="console">
      <Container>
        <Container>
          <Row className="justify-content-center">
            <Col xs="auto">
              <h1 className="text-center">Sản Phẩm Thử Nghiệm</h1>
            </Col>
          </Row>
        </Container>
        <Row xs={1} md={2} className="g-3">
          {product.map((product, index) => (
            <Col key={index} xs={3} sm={6} lg={3} className="product-column">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default ConsolePage;
