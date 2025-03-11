import React from "react";
import Footer from "../components/Footer.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/App.css";
import DanhMuc from "../components/DanhMuc.jsx";
import { Container, Row } from "react-bootstrap";

function HomePage() {
  return (
    <div className="homepage">
      <Container className="homepage-container">
        <Row className="justify-content-md-center">
          <main className="homepage-main">
            <div className="banner-container">
              <Banner />
            </div>
          </main>
          <footer>
            <Footer />
          </footer>
        </Row>
      </Container>
    </div>
  );
}
export default HomePage;
