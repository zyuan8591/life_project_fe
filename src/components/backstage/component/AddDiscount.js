import React, { useState } from 'react';
import '../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { FiShoppingBag } from 'react-icons/fi';

import axios from 'axios';
import { API_URL } from '../../../utils/config';
import Notification from '../../activity/Notification';
import { useEffect } from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
function AddDiscount({
  setAddDiscountPage,
  loading,
  setLoading,
  setLoginBtn,
  user,
}) {
  const [errMsg, setErrMsg] = useState(false);
  // const [loginBtn, setLoginBtn] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [product, setProduct] = useState({
    name: 'SMEG全館9折起',
    discount: 9,
  });
  function handleChange(e) {
    const newProduct = { ...product, [e.target.name]: e.target.value };

    setProduct(newProduct);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let data = {
        name: product.name,
        discount: product.discount,
        start_time: startTime,
        end_time: endTime,
        company: user,
      };

      let response = await axios.post(
        `${API_URL}/products/addDiscount`,
        data
        // {
        //   withCredentials: true,
        // }
      );
      let newsResponse = await axios.post(`${API_URL}/news`, {
        category: 1,
        content: product.name,
      });
      if (response.data.message === '此商品已存在') {
        setErrMsg(true);
        setTimeout(() => {
          setErrMsg(false);
        }, 2000);
      } else {
        setLoading(!loading);
        setLoginBtn('addDiscount');
        setTimeout(() => {
          // setPageNow(lastPage);
        }, 1000);
        setTimeout(() => {
          setLoginBtn('');
        }, 2000);
        setTimeout(() => {
          setAddDiscountPage(false);
        }, 600);
      }

    } catch (e) {
      console.error('addProduct', e);
    }
  }

  return (
    <>
      {errMsg ? (
        <Notification contaninText="商品名稱重複">
          <FiShoppingBag />
        </Notification>
      ) : (
        ''
      )}

      <div className="backstageAddPage">
        <form className="formContainer">
          <IconContext.Provider
            value={{ color: '#817161', size: '2em', className: 'closeIcon' }}
          >
            <IoCloseSharp
              onClick={() => {
                setAddDiscountPage(false);
              }}
            />
          </IconContext.Provider>

          <div className="pageTitle">
            <p>新增折扣</p>
          </div>
          <div className="my-5">
            {/* title place lat */}
            <div className="center">
              <div className="mb-4">
                <label>折扣名稱：</label>
                <input
                  className="discountInput"
                  id="name"
                  name="name"
                  type="text"
                  maxLength={15}
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label>　　折扣：</label>
                <input
                  className="discountInput"
                  id="discount"
                  name="discount"
                  type="text"
                  maxLength={10}
                  value={product.discount}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <label>折扣日期：</label>
                <div className="date">
                  <Space direction="vertical" size="small">
                    <RangePicker
                      // renderExtraFooter={() => '折扣開始日期'}
                      id="time"
                      showTime
                      format=""
                      onCalendarChange={(info, dateStrings) => {
                        setStartTime(dateStrings[0]);
                        setEndTime(dateStrings[1]);
                      }}
                    />
                  </Space>
                </div>
              </div>
            </div>
          </div>

          {/* actDate */}
          <div className="">
            <div className="d-flex flex-column align-items-end"></div>
          </div>

          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn" type="submit" onClick={handleSubmit}>
              新增
            </button>
            <button
              className="cancelBtn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setAddDiscountPage(false);
              }}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddDiscount;
