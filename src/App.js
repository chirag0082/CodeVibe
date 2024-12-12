import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AdminHeader from "./component/admin/layout/AdminHeader";
import AboutUS from "./pages/AboutUS";
import AdminLogin from "./pages/AdminLogin";
import Career from "./pages/Career";
import CompanyServices from "./pages/CompanyServices";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import HeaderMenu from "./pages/Header";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmpLeaveApprove from "./pages/admin/EmpLeaveApprove";
import EmpSalary from "./pages/admin/EmpSalary";

import "./css/responsive.css";
import "./css/style.css";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.adminSlice);
  const isAuthenticated = user.userName !== "";

  if (adminOnly && !isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

function App() {
  const user = useSelector((state) => state.adminSlice);
  const isAuthenticated = user.userName !== "";

  const HeaderComponent = ({ children }) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");

    return (
      <>
        {isAuthenticated && isAdminRoute ? <AdminHeader /> : <HeaderMenu />}
        {children}
        <Footer />
      </>
    );
  };

  return (
    <Router>
      <HeaderComponent>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/services" element={<CompanyServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />

          <Route
            path="/admin-login"
            element={
              <ProtectedRoute adminOnly={false}>
                <AdminLogin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/leave-approve"
            element={
              <ProtectedRoute adminOnly={true}>
                <EmpLeaveApprove />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/salary"
            element={
              <ProtectedRoute adminOnly={true}>
                <EmpSalary />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HeaderComponent>
    </Router>
  );
}

export default App;
