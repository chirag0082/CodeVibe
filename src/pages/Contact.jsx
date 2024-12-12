import React from 'react';
import clint from '../Images/clint.jpg';
import icon from '../Images/icon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
function Contact() {
  const [contactUS, setContactUS] = React.useState({
    name: '',
    phone: '',
    email: '',
    msg: ''
  });
  const handleChange = (e) => {
    setContactUS({ ...contactUS, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!contactUS.name) {
      toast.error('please enter your name');
    }
    if (!contactUS.phone) {
      toast.error('please enter phone number');
    }
    if (!contactUS.email) {
      toast.error('please enter email');
    }
    if (!contactUS.msg) {
      toast.error('please enter your message');
    }
    if (contactUS.email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = re.test(String(contactUS.email).toLowerCase());
      if (!isValid) {
        toast.error('please enter valid email');
      }
    }
    if (contactUS.phone) {
      const re = /^\d{10}$/;
      const isValid = re.test(String(contactUS.phone).toLowerCase());
      if (!isValid) {
        toast.error('please enter valid mobile number');
      }
    }

    if (
      contactUS.name &&
      contactUS.phone &&
      contactUS.email &&
      contactUS.msg &&
      contactUS.phone
    ) {
      emailjs
        .send(
          'service_6hy1dgn',
          'template_cpmdyab',
          contactUS,
          'HZ8NSoUMoP2PDtE0k'
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success('Message sent successfully');
          },
          (error) => {
            console.log(error.text);
            toast.error('Something went wrong !!!');
          }
        );
    }
  };
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
                    placeholder='name'
                    type='type'
                    name='name'
                    value={contactUS.name}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12'>
                  <input
                    className='contactus'
                    placeholder='Phone Number'
                    type='type'
                    name='phone'
                    onChange={handleChange}
                    maxLength='12'
                    value={contactUS.phone}
                  />
                </div>
                <div className='col-md-12'>
                  <input
                    className='contactus'
                    placeholder='Email'
                    type='type'
                    name='email'
                    value={contactUS.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-12'>
                  <textarea
                    className='textarea'
                    placeholder='Message'
                    value={contactUS.msg}
                    onChange={handleChange}
                    name='msg'
                  ></textarea>
                </div>
                <div className='col-md-12'>
                  <button
                    className='send_btn'
                    onClick={(e) => {
                      e.preventDefault();
                      // alert('clicked')
                      validateInput();
                    }}
                  >
                    Send Now
                  </button>
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
                          "Working with CodeVibe Team was a super cool
                          experience and game-changer for our business. Their
                          team's expertise and dedication to understanding our
                          needs resulted in a solution that not only met but
                          exceeded our expectations."
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
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem
                          IpsumIt is a long established fact that a reader will
                          be distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
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
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem
                          IpsumIt is a long established fact that a reader will
                          be distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contact;
