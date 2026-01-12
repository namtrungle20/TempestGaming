import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./page/Auth/SignInPage.jsx";
import SignUp from "./page/Auth/SignUpPage.jsx";
import AdminPage from "./page/AdminPage.jsx";
import HomePage from "./page/HomePage.jsx"
import NotFound from "./page/NotFound.jsx";
import { Toaster } from "sonner";

import { ProtectedRoute } from "./components/admin/ProtectedRoute.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Routes>

          <Route element={<ProtectedRoute allowAdminOnly={true} />}>
            {/* Bất cứ gì nằm trong này đều bị chặn nếu role !== admin */}
            <Route path="/admin/*" element={<AdminPage />} />
          </Route>

          {/*dưới là trang user*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
