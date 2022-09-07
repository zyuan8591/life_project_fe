import React from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import '../../../styles/product/_productRecommend.scss';
const ProductRecommend = () => {
  var settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="recommendContainer">
        <h2>推薦商品</h2>
        <Slider {...settings}>
          {[...Array(5)].map((v, i) => {
            return (
              <>
                <div className="productContainer" key={i}>
                  <h3>{i + 1}</h3>
                  <img src="http://placekitten.com/g/400/200" alt="" />
                  <img src="http://placekitten.com/g/400/200" alt="" />
                  <img src="http://placekitten.com/g/400/200" alt="" />
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductRecommend;
