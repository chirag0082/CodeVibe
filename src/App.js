// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Component/Landing';
import AboutUS from './Component/AboutUS';
import CompanyServices from './Component/CompanyServices';
import Portfolio from './Component/Portfolio';
import Contact from './Component/Contact';
import './css/style.css';
import './css/responsive.css';
import HeaderMenu from './Component/Header';
import Footer from './Component/Footer';

function App() {
  return (
    <>
      <Router>
        {/* <div> Chirag </div> */}
        <HeaderMenu />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/about' element={<AboutUS />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<CompanyServices />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path="*" element={<Landing />} />
        </Routes>
        <Footer />
      </Router>
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
