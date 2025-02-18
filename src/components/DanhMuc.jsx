import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const categories = [
    { name: "Console", path: "/console" }
];

const DanhMuc =()=> {
  return (
    <div className="danhmuc">
      <h3>Danh Mục</h3>
      <Navbar style={{padding: "10px", paddingLeft: "20px"}}>
        <Nav className="nav-category">
          {categories.map((category, index) => (
            <Link key={index} to={category.path} className="nav-link">
              {category.name}
            </Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}

export default DanhMuc;
