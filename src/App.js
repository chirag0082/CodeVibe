import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Component/Landing";
import AboutUS from "./Component/AboutUS";
import CompanyServices from "./Component/CompanyServices";
import Portfolio from "./Component/Portfolio";
import Contact from "./Component/Contact";
import Career from "./Component/Career";
import "./css/style.css";
import "./css/responsive.css";
import HeaderMenu from "./Component/Header";
import Footer from "./Component/Footer";

function App() {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      <Router>
        <HeaderMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<CompanyServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/career" element={<Career />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <Footer setShowMenu={setShowMenu} />
      </Router>
    </>
  );
}

export default App;
