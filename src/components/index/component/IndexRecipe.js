import React, { useEffect, useState } from 'react';
import CardSm from '../../public_component/CardSm';
import { API_URL_IMG } from '../../../utils/config';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper';

const IndexRecipe = ({ data = [] }) => {
  const [vw, setVw] = useState(window.innerWidth);
  const [slidesToShow, setSlideToShow] = useState(6);

  const setViewportWidth = () => setVw(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', setViewportWidth);
    return function cleanUp() {
      window.removeEventListener('resize', setViewportWidth);
    };
  }, []);
  useEffect(() => {
    if (vw < 500) return setSlideToShow(2);
    if (vw < 600) return setSlideToShow(3);
    if (vw < 900) return setSlideToShow(4);
    if (vw < 1200) return setSlideToShow(4);
    if (vw < 1200) return setSlideToShow(5);
    setSlideToShow(6);
  }, [vw]);
  return (
    <div className="recipeCard">
      <Swiper
        slidesPerView={slidesToShow}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {data.map((d) => {
          return (
            <SwiperSlide key={d.id}>
              <CardSm
                img={`${API_URL_IMG}${d.image}`}
                type={d.recipe_category_name}
                name={d.name}
                link={`/recipeDetail?id=${d.id}`}
                className="rounded-1"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default IndexRecipe;
