import React from 'react';
import '../../../styles/picnic/_picnicIndex.scss';
import Header from '../../public_component/Header';
import Footer from '../../public_component/Footer';
import BackToTop from '../../public_component/BackToTop';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoIosArrowDropdown } from 'react-icons/io';
import TitleBanner from './TitleBanner';
import Content from './Content';

function PicnicIndex() {
  return (
    <>
      <Header />
      <TitleBanner />
      <main className="main ">
        <Content />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default PicnicIndex;
