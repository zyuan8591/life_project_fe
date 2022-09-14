import React from 'react';
import '../../../styles/product/_productCategory.scss';

const ProductCategory = ({ productCate }) => {
  console.log('lllllll',productCate)
  return (
    <div className="categoryContainer">
      <div className="title">
        <p>CATEGORY</p>
      </div>
      {productCate.map((v, i) => {
        return (
          <div key={i} className="category">
            {v}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
