import React from 'react';
import '../../../styles/picnic/_picnicIndex.scss';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoIosArrowDropdown } from 'react-icons/io';
import TitleBanner from './TitleBanner';
import Content from './Content';

function PicnicIndex() {
  return (
    <>
      <main className="main ">
        {/* section main banner */}
        <TitleBanner />
        <Content />
      </main>
    </>
  );
}

export default PicnicIndex;
