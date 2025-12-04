import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./scenes/Auth/Login.jsx";
import AdminDashboard from "./scenes/Admin/Dashboard.jsx";
import UserDashboard from "./scenes/User/UserDashboard.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );

}

export default App
