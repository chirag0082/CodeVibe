import React from 'react';
import chose1 from '../Images/chose1.png';
import chose2 from '../Images/chose2.png';
import chose3 from '../Images/chose3.png';

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
            </div>
          </div>
          <div className='col-lg-5 col-md-4'>
            <div className='chose_box'>
              <i>
                <img src={chose2} alt='#' />
              </i>
              <h3>Happy Clients </h3>
              <strong>30+</strong>
            </div>
          </div>
          <div className='col-lg-2 col-md-4'>
            <div className='chose_box'>
              <i>
                <img src={chose3} alt='#' />
              </i>
              <h3>Customer Satisfaction</h3>
              <strong>100 %</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
