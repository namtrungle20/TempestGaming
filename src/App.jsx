import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div id="app-header">
        <Header />
      </div>
      <div id="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
