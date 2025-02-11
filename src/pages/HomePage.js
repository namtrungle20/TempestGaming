import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Banner from "../components/Banner.js";
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
