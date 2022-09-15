import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../public_component/Header';
import ProductInfo from './ProductInfo';
import Footer from '../../public_component/Footer';
import ProductTab from './ProductTab';
import ProductTabContent from './ProductTabContent';
import Tools from '../Tools';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
const ProductDetail = () => {
  // const [params, setParams] = useParams();
  const [tabNow, setTabNow] = useState(1);
  const [productData, setProductData] = useState([]);
  // const id = searchParams.get('id');
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/${id}`);
      setProductData(result.data[0]);
    })();
  }, [id]);
  return (
    <>
      <Header />
      <ProductInfo data={productData} />
      <ProductTab tabNow={tabNow} setTabNow={setTabNow} />
      <ProductTabContent
        tabNow={tabNow}
        setTabNow={setTabNow}
        spec={productData.spec}
      />
      <Tools />
      <Footer />
    </>
  );
};

export default ProductDetail;
