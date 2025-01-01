import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import AdminHeader from "./component/admin/layout/AdminHeader";
import AboutUS from "./pages/AboutUS";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TraineeDashboard from "./pages/admin/TraineeDashboard";
import EmpLeaveList from "./pages/admin/EmpLeaveList";
import EmpSalaryPage from "./pages/admin/EmpSalaryPage";
import AdminLogin from "./pages/AdminLogin";
import Career from "./pages/Career";
import CompanyServices from "./pages/CompanyServices";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import HeaderMenu from "./pages/Header";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";

import { ToastContainer } from "react-toastify";
import "./css/style.css";
import "./css/responsive.css";
import UserProfile from "./pages/user/UserProfile";
import UserLogin from "./pages/UserLogin";
import CompanyLedger from "./pages/admin/CompanyLedger";
import "react-datepicker/dist/react-datepicker.css";

const ProtectedRouteAdmin = ({ children }) => {
  const user = useSelector((state) => state.adminSlice);
  const isAuthenticated = user.isAuthenticated;
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

const ProtectedRouteUser = ({ children }) => {
  const user = useSelector((state) => state.userSlice);
  const isAuthenticated = user.isAuthenticated;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const user = useSelector((state) => state.adminSlice);
  const [showMenu, setShowMenu] = useState(false);
  const isAuthenticatedAdmin = user.isAuthenticated;

  const HeaderComponent = ({ children }) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");

    if (isAdminRoute && isAuthenticatedAdmin) {
      return (
        <>
          <AdminHeader setShowMenu={setShowMenu} showMenu={showMenu} />
          {children}
          <Footer setShowMenu={setShowMenu} />
        </>
      );
    }

    return (
      <>
        <HeaderMenu setShowMenu={setShowMenu} showMenu={showMenu} />
        {children}
        <Footer setShowMenu={setShowMenu} />
      </>
    );
  };

  return (
    <Router>
      <ToastContainer />

      <HeaderComponent>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/services" element={<CompanyServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRouteAdmin>
                <AdminDashboard />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/admin/trainee"
            element={
              <ProtectedRouteAdmin>
                <TraineeDashboard />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/admin/leave-approve"
            element={
              <ProtectedRouteAdmin>
                <EmpLeaveList />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/admin/salary"
            element={
              <ProtectedRouteAdmin>
                <EmpSalaryPage />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/admin/ledger"
            element={
              <ProtectedRouteAdmin>
                <CompanyLedger />
              </ProtectedRouteAdmin>
            }
          />

          {/* User Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route
            path="/user"
            element={
              <ProtectedRouteUser>
                <UserProfile />
              </ProtectedRouteUser>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HeaderComponent>
    </Router>
  );
}

export default App;
