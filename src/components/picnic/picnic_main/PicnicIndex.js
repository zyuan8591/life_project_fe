import React from 'react';
import '../../../styles/picnic/_picnicIndex.scss';
import Header from '../../public_component/Header';
import BreadCrumb from '../../public_component/BreadCrumb';
import Footer from '../../public_component/Footer';
import BackToTop from '../../public_component/BackToTop';
import TitleBanner from './TitleBanner';
import Content from './Content';
import Contact from '../../contact/Contact';

function PicnicIndex() {
  return (
    <>
      <Header />
      <TitleBanner />
      <main className="main ">
        <BreadCrumb />
        <Content />
      </main>
      <Footer />
      <Contact />
      <BackToTop />
    </>
  );
}

export default PicnicIndex;
