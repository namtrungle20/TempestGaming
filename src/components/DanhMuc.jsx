import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const categories = [
    { name: "Console", path: "/" }
];

function DanhMuc() {
  return (
    <div className="danhmuc">
      <h3>Danh Mục</h3>
      <Navbar>
        <Nav className="nav-category">
          {categories.map((category, index) => (
            <Nav.Link key={index} href={category.path}>
              {category.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}

export default DanhMuc;
