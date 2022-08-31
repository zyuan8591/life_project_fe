import React from 'react';
import { useState } from 'react';
import '../../../styles/_productFilter.scss';
import { IconContext } from 'react-icons';
import { IoIosSearch } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

// const brandArr = [];
const ProductFilter = () => {
  const [brandArr, setBrandArr] = useState(26);
  return (
    <IconContext.Provider
      value={{ color: '#444', size: '1.6rem', className: '' }}
    >
      <div className="filter">
        <div>
          <div className="filterBrand">
            <p>篩選廠商、價格...</p>
            <RiArrowDownSFill />
          </div>
          <div className="filterBoard">
            <div className="brandSection">
              <div className="brandSearch">
                <p>品牌</p>
                <input type="text" placeholder="品牌搜尋" />
              </div>
              <div className="d-flex flex-wrap">
                {Array(brandArr)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <div className="brand" key={i}>
                        <input type="checkbox" className="checkbox" />
                        <label>aaaaaa</label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="priceSection">
              <div>
                <p>價格範圍:</p>
              </div>
              <button>所有</button>
              <button>$1,000以下</button>
              <button>$1,000 ~ $3,000</button>
              <button>$3,000 ~ $5,000</button>
              <button>$5,000 ~ $10,000</button>
              <button>$10,000以上</button>
              <div>
                <p>NT$</p>
                <input type="number" /> -
                <input type="number" />
                <BsFillArrowRightSquareFill value={{ background: '#817161' }} />
              </div>
            </div>
          </div>
        </div>
        <select className="filterPopular">
          <option value="">熱門程度優先</option>
          <option value="">最新商品</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
        <div className="d-flex">
          <input
            type="text"
            className="search"
            value=""
            placeholder="搜尋商品名稱"
          />
          <button className="searchButton">
            <IoIosSearch />
          </button>
        </div>
        <p>1 ~ 12 筆 (共 24 筆)</p>
      </div>
    </IconContext.Provider>
  );
};

export default ProductFilter;
