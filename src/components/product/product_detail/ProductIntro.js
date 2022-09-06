import React from 'react';
const img = '/img/product/product_detail_img/BRUNO_BOE051_detail_01.jpeg';
const img2 = '/img/product/product_detail_img/BRUNO_BOE051_detail_02.jpeg';
const img3 = '/img/product/product_detail_img/BRUNO_BOE051_detail_03.jpeg';
const img4 = '/img/product/product_detail_img/BRUNO_BOE051_detail_04.jpeg';
const img5 = '/img/product/product_detail_img/BRUNO_BOE051_detail_05.jpeg';
const ProductIntro = () => {
  const imgArr = [img, img2, img3, img4, img5];
  return (
    <>
      {imgArr.map((v, i) => {
        return <img src={v} alt="" key={i} />;
      })}
    </>
  );
};

export default ProductIntro;
