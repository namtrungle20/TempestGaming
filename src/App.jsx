import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./page/Auth/SignInPage.jsx";
import SignUp from "./page/Auth/SignUpPage.jsx";
import AdminPage from "./page/AdminPage.jsx";
import HomePage from "./page/HomePage.jsx"
import NotFound from "./page/NotFound.jsx";
import { Toaster } from "sonner";



function App() {
  return <>
    <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element ={<AdminPage/>}/>
        {/*dưới là trang user*/}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </>

}

export default App
