import React from 'react'
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
function HeaderMenu() {
  const navigate = useNavigate();
  const handleClickLanding = () => {
    navigate('/');
  };
  const handleClickAbout = () => {
    navigate('/about');
  };
  const handleClickContact = () => {
    navigate('/contact');
  };
  const handleClickServices = () => {
    navigate('/services');
  };
  const handleClickPortfolio = () => {
    navigate('/portfolio');
  };
  return (
    <div className='header'>
    <div className='container-fluid'>
      <div className='row d_flex'>
        <div className='col-md-2 col-sm-3 col logo_section'>
          <div className='full'>
            <div className='center-desk'>
              <div className='logo'>
                <a href='#' onClick={handleClickLanding}>
                  <img src={logo} alt='#' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-8 col-sm-9'>
          <nav className='navigation navbar navbar-expand-md navbar-dark '>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarsExample04'
              aria-controls='navbarsExample04'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarsExample04'
            >
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <a className='nav-link' href='#' onClick={handleClickLanding}>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#' onClick={handleClickAbout}>
                    About
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#' onClick={handleClickServices}>
                    What we do
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#' onClick={handleClickPortfolio}>
                    Portfolio{' '}
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#' onClick={handleClickContact}>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* <div className='col-md-2 d_none'>
          <ul className='email text_align_right'>
            <li>
              {' '}
              <a href='#'> Login </a>
            </li>
            <li>
              {' '}
              <a href='#'>
                {' '}
                <i
                  className='fa fa-search'
                  //style={'cursor: pointer;'}
                  aria-hidden='true'
                >
                  {' '}
                </i>
              </a>{' '}
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default HeaderMenu