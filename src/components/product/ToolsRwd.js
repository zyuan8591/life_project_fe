import React from 'react';
import { useState, useEffect } from 'react';
import '../../styles/product/_toolsRwd.scss';
import { IconContext } from 'react-icons';
import { IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { TbAlignJustified } from 'react-icons/tb';
import { IoCloseOutline } from 'react-icons/io5';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsArrowRightCircle } from 'react-icons/bs';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../../utils/config';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

const ToolsRwd = ({
  setProductCateNow,
  checked,
  setChecked,
  setBiggerThan,
  setSmallThan,
  total,
}) => {
  const [productCate, setProductCate] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [cateActive, setCateActive] = useState(false);
  const [brandActive, setBrandActive] = useState(false);

  useEffect(() => {
    (async () => {
      let productCateResult = await axios.get(`${API_URL}/products/category`);
      let productCateData = productCateResult.data;
      setProductCate([{ id: 0, name: '所有分類' }, ...productCateData]);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/brand?brand=`);
      //   console.log(result.data);
      setBrandArr(result.data);
    })();
  }, []);
  function log(value) {
    setBiggerThan(value[0]);
    setSmallThan(value[1]);
  }
  return (
    <>
      <div className="toolsRwd">
        <IconContext.Provider value={{ size: '2rem', color: 'white' }}>
          <TbAlignJustified
            onClick={() => {
              setShowFilter(true);
            }}
          />
        </IconContext.Provider>
        <IconContext.Provider value={{ size: '2.2rem', color: 'white' }}>
          <IoIosArrowUp />
        </IconContext.Provider>
      </div>
      <div
        className="filterBox"
        style={{
          opacity: showFilter ? '1' : '0',
          zIndex: showFilter ? '1000' : '-1',
        }}
      >
        <div className="filterContainer">
          <div className="closeArea">
            <IconContext.Provider value={{ size: '5rem', color: 'white' }}>
              <div className="close">
                <IoCloseOutline
                  onClick={() => {
                    setShowFilter(false);
                  }}
                />
              </div>
            </IconContext.Provider>
          </div>
          <div
            className="cateArea"
            style={{ height: cateActive ? '' : '317.4px' }}
          >
            <div
              className="cateTitle"
              onClick={() => {
                setCateActive(!cateActive);
              }}
            >
              <h5>Category</h5>
              <IconContext.Provider value={{ size: '1.4rem', color: '#444' }}>
                <AiFillPlusCircle />
              </IconContext.Provider>
            </div>
            <div className="cateGrid">
              {productCate.map((v, i) => {
                return (
                  <div
                    className="cate"
                    key={i}
                    onClick={() => {
                      setActiveId(v.id);
                      setProductCateNow(v.id);
                    }}
                    style={{
                      background: activeId === v.id ? '#444' : 'white',
                      color: activeId === v.id ? 'white' : '',
                    }}
                  >
                    <div className="catePic">
                      {/* <img
                        src={`${API_URL_IMG}/product/product_icon/${v.img}`}
                        alt=""
                      /> */}
                    </div>
                    <p>{v.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="brandArea"
            style={{ height: brandActive ? '' : '60px' }}
          >
            <div
              className="brandTitle"
              onClick={() => {
                setBrandActive(!brandActive);
              }}
            >
              <h5>Brand</h5>
              <IconContext.Provider value={{ size: '1.4rem', color: '#444' }}>
                <AiFillPlusCircle />
              </IconContext.Provider>
            </div>
            <div className="brandGrid">
              {brandArr.map((v, i) => {
                return (
                  <div className="brand" key={i}>
                    <label htmlFor={v.name}>{v.name}</label>
                    <input
                      type="checkbox"
                      id={v.name}
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
                  </div>
                );
              })}
            </div>
          </div>
          <div className="priceArea">
            <div className="priceTitle">
              <h5>Price</h5>
            </div>
            <Slider
              className="slider"
              range
              step={1}
              max={35000}
              defaultValue={[0, 35000]}
              onChange={log}
            />
          </div>
        </div>
        <div className="resultArea">
          <div className="result">
            <p>Result</p>
            <h4>{total}</h4>
          </div>
          <div className="button">
            <button
              className="clearAll"
              onClick={() => {
                setProductCateNow(0);
                setActiveId(0);
                setChecked([]);
                setBiggerThan('');
                setSmallThan('');
                setShowFilter(false);
              }}
            >
              清除所有選擇
            </button>
            <button
              className="choose"
              onClick={() => {
                setShowFilter(false);
              }}
            >
              選擇
              <IconContext.Provider value={{ size: '1.2rem', color: 'white' }}>
                <BsArrowRightCircle />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsRwd;
