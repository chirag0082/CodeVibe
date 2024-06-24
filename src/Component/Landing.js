import React from 'react';
import '../css/style.css';
import '../css/responsive.css';
import prot1 from '../Images/prot1.png';
import prot2 from '../Images/prot2.png';
import prot3 from '../Images/prot3.png';
import prot4 from '../Images/prot4.png';

import we1 from '../Images/we1.png'
import we2 from '../Images/we2.png'
import we3 from '../Images/we3.png'
import chose1 from '../Images/chose1.png'
import chose2 from '../Images/chose2.png'
import chose3 from '../Images/chose3.png'
import clint from '../Images/clint.jpg'
import icon from '../Images/icon.png'
import logo_footer from '../Images/logo_footer.png'
import HeaderMenu from './Header';
import BannerSection from './Banner';
import CompanyServices from './CompanyServices';
import AboutUS from './AboutUS';
import Portfolio from './Portfolio';
import Client from './Client';
import Contact from './Contact';
import Footer from './Footer';

function Landing() {
  return (
    <>
      <div className='main-layout'>
        {/* <div className='loader_bg'>
          <div className='loader'>
            <img src='../Images/loading.gif' alt='' />
          </div>
        </div> */}

        {/* <div> */}
          {/* <div className='header'>
            <div className='container-fluid'>
              <div className='row d_flex'>
                <div className='col-md-2 col-sm-3 col logo_section'>
                  <div className='full'>
                    <div className='center-desk'>
                      <div className='logo'>
                        <a href='index.html'>
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
                          <a className='nav-link' href='index.html'>
                            Home
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a className='nav-link' href='about.html'>
                            About
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a className='nav-link' href='we_do.html'>
                            What we do
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a className='nav-link' href='portfolio.html'>
                            Portfolio{' '}
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a className='nav-link' href='contact.html'>
                            Contact Us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className='col-md-2 d_none'>
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
                </div>
              </div>
            </div>
          </div> */}
          {/* <HeaderMenu/> */}
        {/* </div> */}

        {/* <div id='top_section' className=' banner_main'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div
                  id='myCarousel'
                  className='carousel slide'
                  data-ride='carousel'
                >
                  <ol className='carousel-indicators'>
                    <li
                      data-target='#myCarousel'
                      data-slide-to='0'
                      className='active'
                    ></li>
                    <li data-target='#myCarousel' data-slide-to='1'></li>
                    <li data-target='#myCarousel' data-slide-to='2'></li>
                    <li data-target='#myCarousel' data-slide-to='3'></li>
                  </ol>
                  <div className='carousel-inner'>
                    <div className='carousel-item active'>
                      <div className='container-fluid'>
                        <div className='carousel-caption relative'>
                          <div className='bluid'>
                            <h1>
                              Creative <br/>Work Idea{' '}
                            </h1>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum{' '}
                              <br/>
                                available, but the majority have suffered
                                alteration{' '}
                              
                            </p>
                            <a className='read_more' href='about.html'>
                              About Company{' '}
                            </a>
                            <a className='read_more' href='contact.html'>
                              Contact{' '}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container-fluid'>
                        <div className='carousel-caption relative'>
                          <div className='bluid'>
                            <h1>
                              Creative <br/>Work Idea{' '}
                            </h1>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum{' '}
                              <br/>
                                available, but the majority have suffered
                                alteration{' '}
                              
                            </p>
                            <a className='read_more' href='about.html'>
                              About Company{' '}
                            </a>
                            <a className='read_more' href='contact.html'>
                              Contact{' '}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container-fluid'>
                        <div className='carousel-caption relative'>
                          <div className='bluid'>
                            <h1>
                              Creative <br/>Work Idea 
                            </h1>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum{' '}
                              <br/>
                                available, but the majority have suffered
                                alteration{' '}
                              
                            </p>
                            <a className='read_more' href='about.html'>
                              About Company{' '}
                            </a>
                            <a className='read_more' href='contact.html'>
                              Contact{' '}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container-fluid'>
                        <div className='carousel-caption relative'>
                          <div className='bluid'>
                            <h1>
                              Creative <br/>Work Idea {' '}
                            </h1>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum{' '}
                              <br/>
                                available, but the majority have suffered
                                alteration{' '}
                              
                            </p>
                            <a className='read_more' href='about.html'>
                              About Company{' '}
                            </a>
                            <a className='read_more' href='contact.html'>
                              Contact{' '}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className='carousel-control-prev'
                    href='#myCarousel'
                    role='button'
                    data-slide='prev'
                  >
                    <i className='fa fa-angle-left' aria-hidden='true'></i>
                    <span className='sr-only'>Previous</span>
                  </a>
                  <a
                    className='carousel-control-next'
                    href='#myCarousel'
                    role='button'
                    data-slide='next'
                  >
                    <i className='fa fa-angle-right' aria-hidden='true'></i>
                    <span className='sr-only'>Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <BannerSection/>

        {/* <div className='we_do'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='titlepage text_align_center'>
                  <h2>What we do </h2>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div id='we1' className='carousel slide' data-ride='carousel'>
                  <ol className='carousel-indicators'>
                    <li
                      data-target='#we1'
                      data-slide-to='0'
                      className='active'
                    ></li>
                    <li data-target='#we1' data-slide-to='1'></li>
                    <li data-target='#we1' data-slide-to='2'></li>
                    <li data-target='#we1' data-slide-to='3'></li>
                  </ol>
                  <div className='carousel-inner'>
                    <div className='carousel-item active'>
                      <div className='container-fluid'>
                        <div className='carousel-caption we1_do'>
                          <div className='row'>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container-fluid'>
                        <div className='carousel-caption we1_do'>
                          <div className='row'>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we2} alt='#' />
                                </i>
                                <h3>
                                  App <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we3} alt='#' />
                                </i>
                                <h3>
                                  website <br/>design 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container-fluid'>
                        <div className='carousel-caption we1_do'>
                          <div className='row'>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div
                                id='bo_ho'
                                className='we_box text_align_left'
                              >
                                <i>
                                  <img src={we1} alt='#' />
                                </i>
                                <h3>
                                  website <br/>development 
                                </h3>
                                <p>
                                  many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered
                                  alteration in some form, by injected humour,
                                  or randomised words which
                                </p>
                                <a className='read_more' href='we_do'>
                                  Read More
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className='carousel-control-prev'
                    href='#we1'
                    role='button'
                    data-slide='prev'
                  >
                    <i className='fa fa-angle-left' aria-hidden='true'></i>
                    <span className='sr-only'>Previous</span>
                  </a>
                  <a
                    className='carousel-control-next'
                    href='#we1'
                    role='button'
                    data-slide='next'
                  >
                    <i className='fa fa-angle-right' aria-hidden='true'></i>
                    <span className='sr-only'>Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <CompanyServices/>

        {/* <div className='about'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='titlepage text_align_center'>
                  <h2>About Company</h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <AboutUS/>

        {/* <div className='portfolio'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='titlepage text_align_left'>
                  <h2>We Have Done Portfolio </h2>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div id='ho_nf' className='portfolio_main text_align_left'>
                  <figure>
                    <img src={prot1} alt='#' />
                    <div className='portfolio_text'>
                      <div className='li_icon'>
                        <a href='#'>
                          <i className='fa fa-search' aria-hidden='true'></i>
                        </a>
                        <a href='#'>
                          <i className='fa fa-link' aria-hidden='true'></i>
                        </a>
                      </div>
                      <h3>Carrency Dashbord</h3>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majoraity have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable
                      </p>
                    </div>
                  </figure>
                </div>
              </div>
              <div className='col-md-6'>
                <div id='ho_nf' className='portfolio_main text_align_left'>
                  <figure>
                    <img src={prot2} alt='#' />
                    <div className='portfolio_text'>
                      <div className='li_icon'>
                        <a href='#'>
                          <i className='fa fa-search' aria-hidden='true'></i>
                        </a>
                        <a href='#'>
                          <i className='fa fa-link' aria-hidden='true'></i>
                        </a>
                      </div>
                      <h3>Carrency Dashbord</h3>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majoraity have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable
                      </p>
                    </div>
                  </figure>
                </div>
              </div>
              <div className='col-md-6'>
                <div id='ho_nf' className='portfolio_main text_align_left'>
                  <figure>
                    <img src={prot3} alt='#' />
                    <div className='portfolio_text'>
                      <div className='li_icon'>
                        <a href='#'>
                          <i className='fa fa-search' aria-hidden='true'></i>
                        </a>
                        <a href='#'>
                          <i className='fa fa-link' aria-hidden='true'></i>
                        </a>
                      </div>
                      <h3>Carrency Dashbord</h3>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majoraity have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable
                      </p>
                    </div>
                  </figure>
                </div>
              </div>
              <div className='col-md-6'>
                <div id='ho_nf' className='portfolio_main text_align_left'>
                  <figure>
                    <img src={prot4} alt='#' />
                    <div className='portfolio_text'>
                      <div className='li_icon'>
                        <a href='#'>
                          <i className='fa fa-search' aria-hidden='true'></i>
                        </a>
                        <a href='#'>
                          <i className='fa fa-link' aria-hidden='true'></i>
                        </a>
                      </div>
                      <h3>Carrency Dashbord</h3>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majoraity have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable
                      </p>
                    </div>
                  </figure>
                </div>
              </div>
              <div className='col-md-12'>
                <a className='read_more' href='portfolio.html'>
                  See More
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <Portfolio/>

        {/* <div className='chose'>
          <div className='container'>
            <div className='row d_flex'>
              <div className='col-md-12'>
                <div className='titlepage text_align_left'>
                  <h2>Why Chose us</h2>
                </div>
              </div>
              <div className='col-lg-5 col-md-4'>
                <div className='chose_box'>
                  <i>
                    <img src={chose1} alt='#' />
                  </i>
                  <h3>Project Done </h3>
                  <strong>1000+</strong>
                  <a className='read_more' href='#'>
                    Read More
                  </a>
                </div>
              </div>
              <div className='col-lg-5 col-md-4'>
                <div className='chose_box'>
                  <i>
                    <img src={chose2} alt='#' />
                  </i>
                  <h3>Happy Clients </h3>
                  <strong>900+</strong>
                  <a className='read_more' href='#'>
                    Read More
                  </a>
                </div>
              </div>
              <div className='col-lg-2 col-md-4'>
                <div className='chose_box'>
                  <i>
                    <img src={chose3} alt='#' />
                  </i>
                  <h3>Awards</h3>
                  <strong>100+</strong>
                  <a className='read_more' href='#'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Client/>

        {/* <div className='contact'>
          <div className='container'>
            <div className='row '>
              <div className='col-md-6'>
                <div className='titlepage text_align_left'>
                  <h2>Get In Touch</h2>
                </div>
                <form id='request' className='main_form'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <input
                        className='contactus'
                        placeholder='Name'
                        type='type'
                        name=' Name'
                      />
                    </div>
                    <div className='col-md-12'>
                      <input
                        className='contactus'
                        placeholder='Phone Number'
                        type='type'
                        name='Phone Number'
                      />
                    </div>
                    <div className='col-md-12'>
                      <input
                        className='contactus'
                        placeholder='Email'
                        type='type'
                        name='Email'
                      />
                    </div>
                    <div className='col-md-12'>
                      <textarea
                        className='textarea'
                        placeholder='Message'
                        type='type'
                        // Message='Name'
                      ></textarea>
                    </div>
                    <div className='col-md-12'>
                      <button className='send_btn'>Send Now</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className='col-md-6'>
                <div className='titlepage text_align_left'>
                  <h2>What Says Clients</h2>
                </div>
                <div
                  id='clientsl'
                  className='carousel slide our_clientsl'
                  data-ride='carousel'
                >
                  <ol className='carousel-indicators'>
                    <li
                      data-target='#clientsl'
                      data-slide-to='0'
                      className='active'
                    ></li>
                    <li data-target='#clientsl' data-slide-to='1'></li>
                    <li data-target='#clientsl' data-slide-to='2'></li>
                  </ol>
                  <div className='carousel-inner'>
                    <div className='carousel-item active'>
                      <div className='container'>
                        <div className='carousel-caption posi_in'>
                          <div className='clientsl_text'>
                            <i>
                              <img src={clint} alt='#' />
                            </i>
                            <h3>
                              Deno <img src={icon} alt='#' />
                            </h3>
                            <p>
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem IpsumIt is a long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container'>
                        <div className='carousel-caption posi_in'>
                          <div className='clientsl_text'>
                            <i>
                              <img src={clint} alt='#' />
                            </i>
                            <h3>
                              Deno <img src={icon} alt='#' />
                            </h3>
                            <p>
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem IpsumIt is a long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='carousel-item'>
                      <div className='container'>
                        <div className='carousel-caption posi_in'>
                          <div className='clientsl_text'>
                            <i>
                              <img src={clint} alt='#' />
                            </i>
                            <h3>
                              Deno <img src={icon} alt='#' />
                            </h3>
                            <p>
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem IpsumIt is a long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className='carousel-control-prev'
                    href='#clientsl'
                    role='button'
                    data-slide='prev'
                  >
                    <i className='fa fa-angle-left' aria-hidden='true'></i>
                    <span className='sr-only'>Previous</span>
                  </a>
                  <a
                    className='carousel-control-next'
                    href='#clientsl'
                    role='button'
                    data-slide='next'
                  >
                    <i className='fa fa-angle-right' aria-hidden='true'></i>
                    <span className='sr-only'>Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Contact/>

       {/* <Footer/> */}
        {/* <div> */}
          {/* <div className='footer'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-3'>
                  <a className='logo_footer' href='index.html'>
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
                    />
                    <button className='subs_btn'>Sbscribe Now</button>
                  </form>
                </div>
                <div className='col-md-3 col-sm-6'>
                  <div className='Informa helpful'>
                    <h3>Useful Link</h3>
                    <ul>
                      <li>
                        <a href='index.html'>Home</a>
                      </li>
                      <li>
                        <a href='about.html'>About</a>
                      </li>
                      <li>
                        <a href='we_do.html'>What we do</a>
                      </li>
                      <li>
                        <a href='portfolio.html'>Portfolio</a>
                      </li>
                      <li>
                        <a href='contact.html'>Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                  <div className='Informa'>
                    <h3>News</h3>
                    <ul>
                      <li>It is a long established</li>
                      <li>fact that a reader will</li>
                      <li>be distracted by the</li>
                      <li>readable content of a</li>
                      <li>page when</li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                  <div className='Informa'>
                    <h3>company</h3>
                    <ul>
                      <li>It is a long established</li>
                      <li>fact that a reader will</li>
                      <li>be distracted by the</li>
                      <li>readable content of a</li>
                      <li>page when</li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                  <div className='Informa conta'>
                    <h3>contact Us</h3>
                    <ul>
                      <li>
                        {' '}
                        <a href='#'>
                          {' '}
                          <i
                            className='fa fa-map-marker'
                            aria-hidden='true'
                          ></i>{' '}
                          Location
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a href='#'>
                          <i className='fa fa-phone' aria-hidden='true'></i>{' '}
                          Call +01 1234567890
                        </a>
                      </li>
                      <li>
                        {' '}
                        <a href='#'>
                          {' '}
                          <i
                            className='fa fa-envelope'
                            aria-hidden='true'
                          ></i>{' '}
                          demo@gmail.com
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
                      © 2020 All Rights Reserved.{' '}
                      <a href='https://html.design/'> Free Html Template</a>
                    </p>
                  </div>
                  <div className='col-md-6'>
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
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      {/* </div> */}
    </>
  );
}

export default Landing;
