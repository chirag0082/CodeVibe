import React from "react";
import logo_footer from "../Images/logo_footer.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import scrollTop from "../utils/scrollTop";

function Footer({ setShowMenu }) {
  const [email, setEmail] = React.useState();
  const navigate = useNavigate();

  const handleClickLanding = () => {
    setShowMenu(false);
    scrollTop();
    navigate("/");
  };

  const handleClickAbout = () => {
    navigate("/about");
    scrollTop();
    setShowMenu(false);
  };
  const handleClickContact = () => {
    setShowMenu(false);
    scrollTop();
    navigate("/contact");
  };
  const handleClickCareer = () => {
    setShowMenu(false);
    scrollTop();
    navigate("/career");
  };
  const handleClickServices = () => {
    setShowMenu(false);
    scrollTop();
    navigate("/services");
  };

  const handleClickPortfolio = () => {
    setShowMenu(false);
    scrollTop();
    navigate("/portfolio");
  };

  const validateInput = (e) => {
    e.preventDefault();
    if (email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = re.test(String(email).toLowerCase());
      if (!isValid) {
        toast.error("please enter valid email");
      } else {
        toast.success("Subscribed successfully");
      }
    } else {
      toast.error("please enter email");
    }
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Link className="logo_footer" onClick={handleClickLanding}>
              <img src={logo_footer} alt="#" />
            </Link>
          </div>
          <div className="col-md-9">
            <form className="newslatter_form">
              <input
                className="ente"
                placeholder="Enter your email"
                type="text"
                name="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className="subs_btn" onClick={validateInput}>
                Sbscribe Now
              </button>
            </form>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="Informa helpful">
              <h3>Useful Link</h3>
              <ul>
                <li>
                  <Link to={"/"} onClick={handleClickLanding}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/about"} onClick={() => handleClickAbout()}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to={"/services"} onClick={handleClickServices}>
                    What we do
                  </Link>
                </li>
                <li>
                  <Link to={"/portfolio"} onClick={handleClickPortfolio}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to={"/contact"} onClick={handleClickContact}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link to={"/career"} onClick={handleClickCareer}>
                    career
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="Informa">
              <h3>News</h3>
              <ul>
                <li>Subscribed US</li>
                <li>Stay Upto Date With our Innovation</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="Informa">
              <h3>Mission</h3>
              <ul>
                <li>Best Quality Work</li>
                <li>Innovate the Future</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="Informa conta">
              <h3>contact Us</h3>
              <ul>
                <li>
                  {" "}
                  <a
                    href="https://www.google.com/maps?q=21.23523328989993,72.85903993829399"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <i className="fa fa-map-marker" aria-hidden="true"></i> 510
                    Amby Valley Arcade Green Road Uttran Surat,Gujarat, India
                  </a>
                </li>

                <li>
                  {" "}
                  <a href="mailto:hr@codevibe.tech">
                    {" "}
                    <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                    hr@codevibe.tech
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright text_align_left">
        <div className="container">
          <div className="row d_flex">
            <div className="col-md-6">
              <p>© 2024 All Rights Reserved. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
