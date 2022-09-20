import React from 'react';
import { useState, useEffect } from 'react';
import '../../../styles/product/_productFilter.scss';
import { IconContext } from 'react-icons';
import { IoIosSearch } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

const ProductFilter = ({
  total,
  search,
  setSearch,
  checked,
  setChecked,
  setBiggerThan,
  setSmallThan,
  setSort,
  count,
  countNow,
}) => {
  const [brandArr, setBrandArr] = useState([]);
  const [price, setPrice] = useState('所有');
  const [showBoard, setShowBoard] = useState(true);
  const [brand, setBrand] = useState('');
  const [big, setBig] = useState('');
  const [small, setSmall] = useState('');
  if (brand.length > 1) {
    setSort(3);
  }

  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/brand?brand=${brand}`);
      // console.log(result.data);
      setBrandArr(result.data);
    })();
  }, [brand]);
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
            // onClick={() => {
            //   setShowBoard(!showBoard);
            // }}
          >
            <p>篩選廠商、價格...</p>
            <RiArrowDownSFill />
          </div>
          {/* {showBoard && ( */}
          <div
            className="filterDisplay"
            style={{
              height: showBoard ? '305px' : '0',
            }}
          >
            <div
              className="filterBoard"
              style={{
                transform: showBoard ? 'translateY(0px)' : '',
              }}
              onMouseOver={() => {
                setShowBoard(true);
              }}
              onMouseOut={() => {
                // setShowBoard(false);
              }}
            >
              <div className="brandSection">
                <div className="brandSearch">
                  <p>品牌</p>
                  <input
                    type="text"
                    placeholder="品牌搜尋"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        setBrand('');
                      }
                    }}
                    style={{
                      background: brand.length > 10 ? 'none' : '',
                    }}
                  />
                </div>
                <div className="test1">
                  {brandArr.map((v, i) => {
                    return (
                      <div className="brand" key={i}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          id={i}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // console.log(v.id);
                              setChecked([...checked, v.id]);
                              // console.log(checked);
                            }
                            if (!e.target.checked) {
                              let newArr = checked.filter((v2) => {
                                return v.id !== v2;
                              });
                              setChecked(newArr);
                              // console.log(v.id);
                            }
                            // console.log(checked);
                          }}
                        />
                        <label htmlFor={i}>{v.name}</label>
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
                      setBiggerThan('');
                      setSmallThan('');
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
                      setBiggerThan(1000);
                      setSmallThan(3000);
                    }}
                  >
                    $1,000 - $3,000
                  </button>
                  <button
                    className={`${price === '3000-5000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('3000-5000');
                      setBiggerThan(3000);
                      setSmallThan(5000);
                    }}
                  >
                    $3,000 - $5,000
                  </button>
                  <button
                    className={`${price === '5000-10000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('5000-10000');
                      setBiggerThan(5000);
                      setSmallThan(1000);
                    }}
                  >
                    $5,000 - $10,000
                  </button>
                  <button
                    className={`${price === '10000' ? 'active' : ''}`}
                    onClick={() => {
                      setPrice('10000');
                      setBiggerThan(10000);
                      setSmallThan('');
                    }}
                  >
                    $10,000以上
                  </button>
                </div>
                <div className="priceSearch">
                  <p className="mx-2">NT$</p>
                  <input
                    className="mx-2"
                    type="number"
                    min={0}
                    onChange={(e) => {
                      setBiggerThan(e.target.value);
                      setBig(e.target);
                      // console.log(big);
                    }}
                  />
                  <p className="mx-2">-</p>
                  <input
                    className="mx-2"
                    type="number"
                    min={0}
                    max={100000}
                    onChange={(e) => {
                      setSmallThan(e.target.value);
                      setSmall(e.target.value);
                      // console.log(small);
                    }}
                  />
                  <IconContext.Provider
                    value={{
                      color: '#817161',
                      size: '1.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    <BsFillArrowRightSquareFill
                      className="mx-2 pointer"
                      onClick={(e) => {
                        // console.log('');
                        setBiggerThan(big);
                        setSmallThan(small);
                      }}
                    />
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
        <select
          className="filterPopular"
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="0">綜合排序</option>
          <option value="1">熱門程度優先</option>
          <option value="2">最新商品</option>
        </select>
        <div className="d-flex">
          <input
            type="text"
            className="searchbar"
            value={search}
            placeholder="搜尋商品名稱"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="searchButton">
            <IoIosSearch />
          </button>
        </div>
        <p>
          {total === 0 ? '' : `${count + 1} ~ ${countNow} 筆`}
          (共 {total} 筆)
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default ProductFilter;
