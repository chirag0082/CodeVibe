import React from 'react'
import { useNavigate } from 'react-router-dom';
function BannerSection() {
  const navigate = useNavigate();
  const handleClickAbout = () => {
    navigate('/about');
  };
  const handleClickContact = () => {
    navigate('/contact');
  };
  return (
    <div id='top_section' className=' banner_main'>
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
                    {/* <li data-target='#myCarousel' data-slide-to='1'></li>
                    <li data-target='#myCarousel' data-slide-to='2'></li>
                    <li data-target='#myCarousel' data-slide-to='3'></li> */}
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
                            <a className='read_more' href='#' onClick={handleClickAbout}>
                              About Company{' '}
                            </a>
                            <a className='read_more' href='#' onClick={handleClickContact}>
                              Contact{' '}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className='carousel-item'>
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
                    </div> */}
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
        </div>
  )
}

export default BannerSection