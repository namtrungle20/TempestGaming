import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import "./index.css";

// 2. Ghi đè hàm setTimeout
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroUIProvider>
        <App />
    </HeroUIProvider>
  </React.StrictMode>,
);
