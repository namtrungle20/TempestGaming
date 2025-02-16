import React from "react";
import Footer from "../components/Footer.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/App.css";
import DanhMuc from "../components/DanhMuc.jsx";

function HomePage() {
  return (
    <div>
      <main style={{ display: 'flex' }}>
        <div style={{ flex: '1 1 200px' }}>
          <DanhMuc />
        </div>
        <div style={{ flex: '3 1 auto' }}>
          <Banner />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
export default HomePage;
