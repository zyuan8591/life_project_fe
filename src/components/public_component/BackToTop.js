import React from 'react';
import { IconContext } from 'react-icons';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const BackToTop = ({
  onClick = () => window.scrollTo({ top: 0 }),
  classname = '',
}) => {
  return (
    <IconContext.Provider value={{ size: '3rem', color: '#817161' }}>
      <div className={`backToTopBtn ${classname}`} onClick={() => onClick()}>
        <BsFillArrowUpCircleFill />
      </div>
    </IconContext.Provider>
  );
};

export default BackToTop;
