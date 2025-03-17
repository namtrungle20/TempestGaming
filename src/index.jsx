import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./fontend/pages/HomePage";
import ConsolePage from "./fontend/pages/ConsolePage";
import LoginPage from "./fontend/pages/LoginPage";
import ResignPage from "./fontend/pages/ResignPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/console" element={<ConsolePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/resign" element={<ResignPage />} />
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
