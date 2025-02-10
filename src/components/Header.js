import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';

const Header =() =>(
    <header className="header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Brand</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">About</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;