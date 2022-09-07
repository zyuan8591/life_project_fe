import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import classes from '../../../../../styles/moduleCss/camping_detail_page/_productSlide.module.scss';
function ProductSlide({ productSlider, product }) {
  return (
    <>
      <div className={classes.slide}>
        <ul
          className={classes.slideImg}
          style={{ transform: `translateX(${productSlider}px)` }}
        >
          {product.map((v) => {
            return (
              <li key={uuidv4()}>
                <img src={`/img/product/product_img/${v.img}`} alt="/" />
                <div className={classes.productLink}>
                  <div className={classes.linkText}>{v.name}</div>
                  <IconContext.Provider
                    value={{ color: '#F2AC33', size: '1.5rem' }}
                  >
                    <Link to="/">
                      <IoIosArrowDroprightCircle />
                    </Link>
                  </IconContext.Provider>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ProductSlide;
