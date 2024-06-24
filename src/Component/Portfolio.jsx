import React from 'react'
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

function Portfolio() {
  return (
    <div className='portfolio'>
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
  </div>
  )
}

export default Portfolio