import React from 'react';
import prot1 from '../Images/prot1.png';
import prot2 from '../Images/prot2.png';
import prot3 from '../Images/prot3.png';
import prot4 from '../Images/prot4.png';

function Portfolio() {
  return (
    <div className='portfolio'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='titlepage text_align_left'>
              <h2>Our Portfolio </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div id='ho_nf' className='portfolio_main text_align_left'>
              <figure>
                <img src={prot1} alt='#' />
                <div className='portfolio_text'>
                  <h3>Web Development</h3>
                  <p>
                    We specialize in creating custom web solutions that drive
                    business growth and enhance user experiences. Explore our
                    portfolio to see how we’ve helped clients transform their
                    digital presence with innovative web development strategies.
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
                  <h3>Data Analysis</h3>
                  <p>
                    We harness advanced graph databases, visualization
                    libraries, and machine learning algorithms to deliver
                    intuitive and impactful data stories
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
                  <h3>Turning Business into Digital Revolutions</h3>
                  <p>
                    We take the time to understand your unique business
                    requirements, goals, and challenges to create solutions that
                    are truly customized to your needs.
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
                  <h3>Client Support</h3>
                  <p>
                    Your satisfaction is our priority. We tailor our support
                    services to meet your specific requirements and respond
                    swiftly to your queries
                  </p>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
