import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./page/auth/SignInPage.jsx";
import SignUp from "./page/auth/SignUpPage.jsx";
import AdminPage from "./page/AdminPage.jsx";
import HomePage from "./page/HomePage.jsx"
import NotFound from "./page/NotFound.jsx";
import { Toaster } from "sonner";

import { PrivateRoute } from "././components/auth/PrivateRoute.jsx"
import { PublicRoute } from "./components/auth/PublicRoute.jsx";
import AppNavbar from "./components/layout/NavbarHeader.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="layout-tempest">
          <Toaster richColors position="top-right" />

          <Routes>

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route element={<UserLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route element={<PrivateRoute allowAdminOnly={true} />}>
              {/* Bất cứ gì nằm trong này đều bị chặn nếu role !== admin */}
              <Route path="/admin/*" element={<AdminPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
