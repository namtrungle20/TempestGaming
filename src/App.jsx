import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./page/Auth/SignIn.jsx";
import SignUp from "./page/Auth/SignUp.jsx";
import HomePage from "./page/HomePage.jsx"
import NotFound from "./page/NotFound.jsx";



function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </>

}

export default App
