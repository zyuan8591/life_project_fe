/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';
import classes from '../../../styles/moduleCss/index/IndexProductSlide.module.scss';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const IndexProductSlide = () => {
  const [data, setData] = useState([]);
  const [slidePosition, setSlidePosition] = useState(0);
  const [slideNow, setSlideNow] = useState(3);
  const cardClr = ['#f7f3ed', '#f6f2f7', '#fcf3f0', '#f7faf2'];
  const slideRef = useRef(null);
  // get default product data
  const resize = () => {
    setSlidePosition(0);
    setSlideNow(0);
  };
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/index`);
      result = result.data.map((d, i) => {
        return {
          id: d.id,
          name: d.name,
          image: d.img,
          brand: d.brand,
          date: d.created_time.slice(5, 11).replace(/-/g, '.'),
          color: cardClr[i % cardClr.length],
        };
      });
      setData(result);
    })();
    window.addEventListener('resize', resize);
    return function clean() {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // slide controll
  const controller = (dir = '') => {
    let position = slidePosition;
    let now = slideNow;
    let containerWidth = slideRef.current.scrollWidth;
    let vw = window.innerWidth;
    let scrollWidth = containerWidth - vw;
    let length = cardArr().length;
    if (dir === 'left') {
      now -= 1;
      if (now < length - 4) position += 253;
    }
    if (dir === 'right') {
      now += 1;
      if (now > 3) position -= 253;
    }
    if (position > 0) position = 0;
    if (position < -scrollWidth) position = -scrollWidth;
    if (now < 0) now = 0;
    if (now > length - 1) now = length - 1;
    setSlidePosition(position);
    setSlideNow(now);
  };

  const cardArr = () => {
    let cardArr = data.map((d, i) => (
      // card
      <Link
        to={`/products/${d.id}`}
        className={`${classes.card} ${i === slideNow && classes.active}`}
        key={d.id}
        style={{ background: '#eee' }}
      >
        <figure
          className={classes.cardImgContain}
          // style={{ background: cardClr[i % 4] }}
          style={{ background: '#999' }}
        >
          <img
            src={`/img/product/product_img/${d.image}`}
            className="objectContain"
            alt={d.name}
          />
          <span className={classes.imgBgText}>{d.brand}</span>
        </figure>
        {/* card intro */}
        <div
          className={classes.intro}
          style={{ color: '#eee', background: '#666' }}
        >
          <div className={classes.name}>{d.name}</div>
          <div className={classes.moreInfo}>
            <div className="row ">
              <span className="col-6 pe-0">品牌：</span>
              <span className="col-6 ps-0 text-uppercase">{d.brand}</span>
            </div>
            <div className="row">
              <span className="col-6 pe-0">上架日期：</span>
              <span className="col-6 ps-0">2022.{d.date}</span>
            </div>
          </div>
        </div>
      </Link>
    ));
    return cardArr;
  };

  return (
    <div className={classes.paddingBox}>
      <IconContext.Provider value={{ color: '#fff', size: '2rem' }}>
        <div className={classes.leftBtn} onClick={() => controller('left')}>
          <AiOutlineDoubleLeft />
        </div>
        <div className={classes.rightBtn} onClick={() => controller('right')}>
          <AiOutlineDoubleRight />
        </div>
      </IconContext.Provider>
      <div
        ref={slideRef}
        className={classes.container}
        style={{
          transform: `translateX(${slidePosition}px)`,
          background: '#444',
        }}
      >
        {cardArr()}
      </div>
    </div>
  );
};

export default IndexProductSlide;
