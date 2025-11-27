import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminWelcome from "./pages/admin/AdminWelcome.jsx";
import UserWelcome from "./pages/UserWelcome.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminWelcome />} />
        <Route path="/user" element={<UserWelcome />} />
      </Routes>
    </Router>
  );

}

export default App
