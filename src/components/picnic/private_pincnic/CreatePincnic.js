import React from 'react';
import { useState } from 'react';
import '../../../styles/picnic/_createPincnic.scss';
import Header from '../../public_component/Header';
import Footer from '../../public_component/Footer';
import BackToTop from '../../public_component/BackToTop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';

function CreatePincnic() {
  return (
    <>
      <Header />
      <main className="createPincnicMain container">
        <form className="d-flex flex-column">
          <div className="form d-flex flex-column mt-4 mb-2">
            <label>活動標題</label>
            <input type="text" placeholder="請輸入活動名稱" />
          </div>

          <div className="form d-flex flex-column mb-4">
            <label htmlFor="createImg" className="imgLabel cursorPointer">
              <IconContext.Provider value={{ color: '#444', size: '4rem' }}>
                <AiOutlineCamera />
              </IconContext.Provider>
              新增圖片
            </label>
            <input type="file" id="createImg" className="d-none" />
          </div>

          <div className="form d-flex flex-column mb-4">
            <label className="">活動日期</label>
            <input type="date" />
          </div>

          <div className="form mb-4">
            <label className="">活動地點</label>
            <div className="m-auto">
              <div className="location mb-2">
                <input
                  type="text"
                  name=""
                  value="台北市"
                  className="inputCity mb-2"
                  readonly
                  disabled
                />
                <select className="ms-2">
                  <option value="">XX區</option>
                  <option value="">XX區</option>
                  <option value="">XX區</option>
                </select>
              </div>
              <input type="text" className="col-sm-12" />
            </div>
          </div>

          <div className="form d-flex flex-column mb-4">
            <label>活動人數 (最低人數5人)</label>
            <input type="number" placeholder="最低人數5人" />
          </div>

          {/* <div className="form d-flex flex-column mb-4">
            <label>活動預估費用</label>
            <input type="number" />
          </div> */}
          <div className="form d-flex flex-column mb-4">
            <label>報名起始日</label>
            <input type="date" />
          </div>

          <div className="form d-flex flex-column mb-4">
            <label>報名結束日</label>
            <input type="date" />
          </div>

          <div className="form d-flex flex-column mb-4">
            <label>活動內容</label>
            <textarea type="text" placeholder="說請明活動內容" rows="5" />
          </div>

          <div className="button d-flex justify-content-center mb-3">
            <button type="submit" className="btn">
              新增活動
            </button>
          </div>
        </form>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default CreatePincnic;
