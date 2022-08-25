import React from 'react';
import { IconContext } from 'react-icons';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const BackToTop = () => {
  return (
    <IconContext.Provider value={{ size: '3rem', color: '#817161' }}>
      <div className="backToTopBtn" onClick={() => window.scrollTo({ top: 0 })}>
        <BsFillArrowUpCircleFill />
      </div>
    </IconContext.Provider>
  );
};

export default BackToTop;
