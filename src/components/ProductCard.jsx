import React from "react";
import { Card, Button, Container, Row } from "react-bootstrap";

const ProductCard = ({ product }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Card
          className="product-card card-shadow"
          hoverable
          style={{ width: "12rem", height: "auto" }}
        >
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Button variant="primary">${product.price}</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ProductCard;
