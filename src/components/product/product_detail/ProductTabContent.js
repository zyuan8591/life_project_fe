import React from 'react';
import ProductIntro from './ProductIntro';
import ProductComment from './ProductComment';
import ProductSpec from './ProductSpec';
import ProductRecommend from './ProductRecommend';
import ProductRecipe from './ProductRecipe';
import '../../../styles/product/_productTabContent.scss';

const ProductTabContent = ({ tabNow, setTabNow }) => {
  const tabs = [
    <ProductIntro />,
    <ProductComment />,
    <ProductSpec />,
    <ProductRecommend />,
    <ProductRecipe />,
  ];
  return (
    <div className={tabNow === 2 ? 'commentContainer' : 'tabsContainer'}>
      {tabs.filter((v, i) => {
        return tabNow === i + 1;
      })}
    </div>
  );
};

export default ProductTabContent;
