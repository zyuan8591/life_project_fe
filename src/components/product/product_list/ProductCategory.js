import React from 'react';
import '../../../styles/product/_productCategory.scss';

const ProductCategory = () => {
  const arr = [
    '鬆餅機/熱壓吐司機',
    '攪拌機',
    '氣泡水機',
    '冰淇淋機',
    '電烤盤',
    '隨行果汁機',
    '氣炸鍋',
    '烤箱/氣炸烤箱',
    '咖啡機',
    '快煮壺',
    '果汁機',
    '料理鍋',
  ];
  return (
    <div className="categoryContainer">
      <div className="title">
        <p>CATEGORY</p>
      </div>
      {arr.map((v, i) => {
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
