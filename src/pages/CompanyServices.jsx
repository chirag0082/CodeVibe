import React from 'react';
import we1 from '../Images/we1.png';
import we2 from '../Images/we2.png';
import we3 from '../Images/we3.png';

function CompanyServices() {
  return (
    <div className='we_do'>
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
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              Website <br />
                              Development
                            </h3>
                            <p>
                              We create visually stunning websites that provide
                              an optimal viewing experience across all devices,
                              from desktops to smartphones <br />
                              We provide solution of cutting edge technology
                            </p>
                            {/* <a className='read_more' href='we_do'>
                                  Read More
                                </a> */}
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              Cloud <br />
                              Services
                            </h3>
                            <p>
                              We help businesses transition to the cloud
                              seamlessly, ensuring minimal disruption and
                              maximum efficiency.
                              <br />
                              Help Business to used seamlessly and uninterrupted
                              cloud services.
                            </p>
                            {/* <a className='read_more' href='we_do'>
                                  Read More
                                </a> */}
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              Custom Software <br />
                              Development
                            </h3>
                            <p>
                              We develop custom web and mobile applications
                              tailored to meet your business needs, providing
                              innovative solutions that enhance productivity and
                              engagement. Turn your business paperless
                            </p>
                            {/* <a className='read_more' href='we_do'>
                                  Read More
                                </a> */}
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
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              website <br />
                              development
                            </h3>
                            <p>
                              many variations of passages of Lorem Ipsum
                              available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which.
                            </p>
                            <a className='read_more' href='we_do'>
                              Read More
                            </a>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we2} alt='#' />
                            </i>
                            <h3>
                              App <br />
                              development
                            </h3>
                            <p>
                              many variations of passages of Lorem Ipsum
                              available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which
                            </p>
                            <a className='read_more' href='we_do'>
                              Read More
                            </a>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we3} alt='#' />
                            </i>
                            <h3>
                              website <br />
                              design
                            </h3>
                            <p>
                              many variations of passages of Lorem Ipsum
                              available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which
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
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              website <br />
                              development
                            </h3>
                            <p>
                              many variations of passages of Lorem Ipsum
                              available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which
                            </p>
                            <a className='read_more' href='we_do'>
                              Read More
                            </a>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              website <br />
                              development
                            </h3>
                            <p>
                              many variations of passages of Lorem Ipsum
                              available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which
                            </p>
                            <a className='read_more' href='we_do'>
                              Read More
                            </a>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div id='bo_ho' className='we_box text_align_left'>
                            <i>
                              <img src={we1} alt='#' />
                            </i>
                            <h3>
                              website <br />
                              development
                            </h3>
                            <p>
                              many variations of passages of Lorem Ipsum
                              available, but the majority have suffered
                              alteration in some form, by injected humour, or
                              randomised words which
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyServices;
