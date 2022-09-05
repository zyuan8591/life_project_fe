import React from 'react';
import { useState } from 'react';
import '../../../styles/product/_productFilter.scss';
import { IconContext } from 'react-icons';
import { IoIosSearch } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

// const brandArr = [];
const ProductFilter = () => {
  const [brandArr, setBrandArr] = useState(26);
  const [price, setPrice] = useState('所有');
  const [showBoard, setShowBoard] = useState(false);
  return (
    <IconContext.Provider
      value={{ color: '#444', size: '1.6rem', className: '' }}
    >
      <div className="filter">
        <div>
          <div
            className="filterBrand"
            onMouseOver={() => {
              setShowBoard(true);
            }}
            onMouseOut={() => {
              setShowBoard(false);
            }}
          >
            <p>篩選廠商、價格...</p>
            <RiArrowDownSFill />
          </div>
          {showBoard && (
            <div
              className="filterBoard"
              onMouseOver={() => {
                setShowBoard(true);
              }}
              onMouseOut={() => {
                setShowBoard(false);
              }}
            >
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
                          <input type="checkbox" className="checkbox" id={i} />
                          <label for={i}>aaaaaa</label>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="priceSection">
                <div className="priceTitle">
                  <p>價格範圍:</p>
                  <button
                    className={`${price === '所有' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('所有');
                    }}
                  >
                    所有
                  </button>
                </div>
                <div className="priceBtn">
                  <button
                    className={`${price === '1000-3000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('1000-3000');
                    }}
                  >
                    $1,000 - $3,000
                  </button>
                  <button
                    className={`${price === '3000-5000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('3000-5000');
                    }}
                  >
                    $3,000 - $5,000
                  </button>
                  <button
                    className={`${price === '5000-10000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('5000-10000');
                    }}
                  >
                    $5,000 - $10,000
                  </button>
                  <button
                    className={`${price === '10000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('10000');
                    }}
                  >
                    $10,000以上
                  </button>
                </div>
                <div className="priceSearch">
                  <p className="mx-2">NT$</p>
                  <input className="mx-2" type="number" />
                  <p className="mx-2">-</p>
                  <input className="mx-2" type="number" />
                  <IconContext.Provider
                    value={{ color: '#817161', size: '1.8rem' }}
                  >
                    <BsFillArrowRightSquareFill className="mx-2" />
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          )}
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
