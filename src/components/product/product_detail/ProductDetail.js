import React from 'react';
import { useState } from 'react';
import Header from '../../public_component/Header';
import ProductInfo from './ProductInfo';
import Footer from '../../public_component/Footer';
import ProductTab from './ProductTab';
import ProductTabContent from './ProductTabContent';
const ProductDetail = () => {
  const [tabNow, setTabNow] = useState(4);
  return (
    <>
      <Header />
      <ProductInfo />
      <ProductTab tabNow={tabNow} setTabNow={setTabNow} />
      <ProductTabContent tabNow={tabNow} setTabNow={setTabNow} />
      <Footer />
    </>
  );
};

export default ProductDetail;
