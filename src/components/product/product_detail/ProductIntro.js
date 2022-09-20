import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

const ProductIntro = () => {
  const [img, setImg] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/${id}/detailImg`);
      setImg(result.data);
      console.log(result.data);
    })();
  }, [id]);
  return (
    <>
      {img.map((v, i) => {
        return (
          <img
            src={`/img/product/product_detail_img/${v.img}`}
            alt=""
            key={i}
          />
        );
      })}
    </>
  );
};

export default ProductIntro;
