import React from 'react';
import { useState } from 'react';
import '../../../styles/product/_productTab.scss';

const ProductTab = ({ tabNow, setTabNow }) => {
  const tab = [
    { id: 1, name: '商品介紹' },
    { id: 2, name: '商品評論' },
    { id: 3, name: '商品規格' },
    { id: 4, name: '推薦商品' },
    { id: 5, name: '相關食譜' },
  ];
  return (
    <div className="tabContainer">
      {tab.map((v) => {
        return (
          <button
            className={`${tabNow === v.id ? 'active' : ''}`}
            onClick={() => {
              setTabNow(v.id);
            }}
            key={v.id}
          >
            {v.name}
          </button>
        );
      })}
    </div>
  );
};

export default ProductTab;
