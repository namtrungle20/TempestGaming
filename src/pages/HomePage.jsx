import React from "react";
import Footer from "../components/Footer.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/App.css";
import DanhMuc from "../components/DanhMuc.jsx";
import { Container, Row } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <main style={{ display: "flex" }}>
            <div>
              <DanhMuc />
            </div>
            <div style={{ flex: "3 1 auto" }}>
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
