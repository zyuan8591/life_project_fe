import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import classes from '../../../styles/moduleCss/recipeDetail/recipeSlide.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../../utils/config';

const RecipeSlide = () => {
  const slideRef = useRef(null);
  const [slideLeft, setSlideLeft] = useState(0);

  // get slide data
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/recipes?random=12`);
      setData(result.data.data);
    })();
  }, []);

  // slide event
  const SlideHandler = (dir) => {
    const scrollWidth =
      slideRef.current.scrollWidth - slideRef.current.offsetWidth;
    const itemWidth = slideRef.current.scrollWidth / data.length;
    let left = slideLeft;
    if (dir === 'left') left -= itemWidth;
    if (dir === 'right') left += itemWidth;
    if (left < 0) left = 0;
    if (left > scrollWidth) left = scrollWidth;
    slideRef.current.scrollTo({ left: left });
    setSlideLeft(left);
  };

  return (
    <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
      <div
        className={`${classes.slide} mx-auto px-5 flexCenter position-relative`}
      >
        {/* left arrow */}
        <div
          className={`${classes.slideLeft} flexCenter start-0`}
          onClick={() => SlideHandler('left')}
        >
          <FaAngleLeft />
        </div>
        {/* slide  */}
        <div
          className={`d-flex gap-4 ${classes.slideContainer}`}
          ref={slideRef}
        >
          {data.map((d) => {
            return (
              <Link
                to={`/recipeDetail?id=${d.id}`}
                key={d.id}
                className={classes.slideItem}
              >
                <figure
                  className={` ${classes.imgContainer} m-0 transition rounded-1 overflow-hidden`}
                >
                  <img
                    src={`${API_URL_IMG}${d.image}`}
                    alt={d.name}
                    className="objectContain"
                  />
                </figure>
              </Link>
            );
          })}
        </div>
        {/* right arrow */}
        <div
          className={`flexCenter end-0 ${classes.slideRight}`}
          onClick={() => SlideHandler('right')}
        >
          <FaAngleRight />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default RecipeSlide;
