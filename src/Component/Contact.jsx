import React from 'react'
import clint from '../Images/clint.jpg'
import icon from '../Images/icon.png'
function Contact() {
  return (
    <div className='contact'>
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
  </div>
  )
}

export default Contact