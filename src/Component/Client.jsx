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

function Client() {
  return (
    <div className='chose'>
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
            <strong>50+</strong>
            {/* <a className='read_more' href='#'>
              Read More
            </a> */}
          </div>
        </div>
        <div className='col-lg-5 col-md-4'>
          <div className='chose_box'>
            <i>
              <img src={chose2} alt='#' />
            </i>
            <h3>Happy Clients </h3>
            <strong>30+</strong>
            {/* <a className='read_more' href='#'>
              Read More
            </a> */}
          </div>
        </div>
        <div className='col-lg-2 col-md-4'>
          <div className='chose_box'>
            <i>
              <img src={chose3} alt='#' />
            </i>
            <h3>Customer Satisfaction</h3>
            <strong>100 %</strong>
            {/* <a className='read_more' href='#'>
              Read More
            </a> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Client