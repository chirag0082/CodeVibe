import React from 'react';
import prot1 from '../Images/prot1.png';
import prot2 from '../Images/prot2.png';
import prot3 from '../Images/prot3.png';
import prot4 from '../Images/prot4.png';

import we1 from '../Images/we1.png';
import we2 from '../Images/we2.png';
import we3 from '../Images/we3.png';
import chose1 from '../Images/chose1.png';
import chose2 from '../Images/chose2.png';
import chose3 from '../Images/chose3.png';
import clint from '../Images/clint.jpg';
import icon from '../Images/icon.png';
import logo_footer from '../Images/logo_footer.png';
import HeaderMenu from './Header';
import BannerSection from './Banner';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Footer({ setShowMenu }) {
  const [email, setEmail] = React.useState();
  const navigate = useNavigate();
  const handleClickLanding = () => {
    setShowMenu(false);
    navigate('/');
  };
  const handleClickAbout = () => {
    setShowMenu(false);
    navigate('/about');
  };
  const handleClickContact = () => {
    setShowMenu(false);
    navigate('/contact');
  };
  const handleClickServices = () => {
    setShowMenu(false);
    navigate('/services');
  };
  const handleClickPortfolio = () => {
    setShowMenu(false);
    navigate('/portfolio');
  };
  const validateInput = (e) => {
    e.preventDefault();
    if (email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = re.test(String(email).toLowerCase());
      if (!isValid) {
        toast.error('please enter valid email');
      } else {
        toast.success('Subscribed successfully');
      }
    }
    else {
      toast.error('please enter email');
    }
  };
  return (
    <div className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <a className='logo_footer' href='#' onClick={handleClickLanding}>
              <img src={logo_footer} alt='#' />
            </a>
          </div>
          <div className='col-md-9'>
            <form className='newslatter_form'>
              <input
                className='ente'
                placeholder='Enter your email'
                type='text'
                name='Enter your email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className='subs_btn' onClick={validateInput}>
                Sbscribe Now
              </button>
            </form>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className='Informa helpful'>
              <h3>Useful Link</h3>
              <ul>
                <li>
                  <a href='#' onClick={handleClickLanding}>
                    Home
                  </a>
                </li>
                <li>
                  <a href='#' onClick={handleClickAbout}>
                    About
                  </a>
                </li>
                <li>
                  <a href='#' onClick={handleClickServices}>
                    What we do
                  </a>
                </li>
                <li>
                  <a href='#' onClick={handleClickPortfolio}>
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href='#' onClick={handleClickContact}>
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className='Informa'>
              <h3>News</h3>
              <ul>
                <li>Subscribed US</li>
                <li>Stay Upto Date With our Innovation</li>
              </ul>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className='Informa'>
              <h3>Mission</h3>
              <ul>
                <li>Best Quality Work</li>
                <li>Innovate the Future</li>
              </ul>
            </div>
          </div>
          <div className='col-md-3 col-sm-6'>
            <div className='Informa conta'>
              <h3>contact Us</h3>
              <ul>
                <li>
                  {' '}
                  <a
                    href='https://www.google.com/maps?q=21.23523328989993,72.85903993829399'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {' '}
                    <i className='fa fa-map-marker' aria-hidden='true'></i> 510
                    Ambey Velly Arcade Amroli - Uttran Road Surat,Gujarat, India
                  </a>
                </li>
                {/* <li>
                        {' '}
                        <a href='#'>
                          <i className='fa fa-phone' aria-hidden='true'></i>{' '}
                          Call +01 1234567890
                        </a>
                      </li> */}
                <li>
                  {' '}
                  <a href='mailto:hr@codevibe.tech'>
                    {' '}
                    <i className='fa fa-envelope' aria-hidden='true'></i>{' '}
                    hr@codevibe.tech
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright text_align_left'>
        <div className='container'>
          <div className='row d_flex'>
            <div className='col-md-6'>
              <p>
                © 2024 All Rights Reserved.{' '}
                {/* <a href='https://html.design/'> Free Html Template</a> */}
              </p>
            </div>
            {/* <div className='col-md-6'>
                    <ul className='social_icon text_align_center'>
                      <li>
                        {' '}
                        <a href='#'>
                          <i className='fa fa-facebook-f'></i>
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a href='#'>
                          <i className='fa fa-twitter'></i>
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a href='#'>
                          <i
                            className='fa fa-linkedin-square'
                            aria-hidden='true'
                          ></i>
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a href='#'>
                          <i className='fa fa-instagram' aria-hidden='true'></i>
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a href='#'>
                          <i
                            className='fa fa-youtube-play'
                            aria-hidden='true'
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Footer;
