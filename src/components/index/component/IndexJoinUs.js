import React, { useRef } from 'react';
import classes from '../../../styles/moduleCss/indexJoinUs.module.scss';
import { Link } from 'react-router-dom';

// ==========================================

const IndexJoinUs = () => {
  return (
    <div className={classes.joinUsContainer}>
      <img src="/img/index/joinUs.jpg" className="objectCover" alt="joinUs" />
      <div className={`${classes.joinUs} joinUs`}>
        <span>JOIN OUR LIFE</span>
        <p className="my-3">
          生活上的美好,都是因為擁有了最好的生活選物,
          <br />
          LIFE提供無論是單身或是家庭的您,享受更高品質的生活。
        </p>
        <Link to="/">JOIN NOW</Link>
      </div>
    </div>
  );
};

export default IndexJoinUs;
