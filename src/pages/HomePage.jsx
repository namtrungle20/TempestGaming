import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/App.css";

function HomePage() {
  return (
    <div className="App">
      <header id="header">
        <Header />
      </header>
      <main>
        <Banner />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
export default HomePage;
