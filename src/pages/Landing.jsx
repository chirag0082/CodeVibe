import React from 'react';
import BannerSection from './Banner';
import CompanyServices from './CompanyServices';
import AboutUS from './AboutUS';
import Portfolio from './Portfolio';
import Client from './Client';
import Contact from './Contact';

function Landing() {
  return (
    <>
      <BannerSection />

      <CompanyServices />

      <AboutUS />

      <Portfolio />

      <Client />

      <Contact />
    </>
  );
}

export default Landing;
