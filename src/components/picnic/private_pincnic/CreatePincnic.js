import React from 'react';
import '../../../styles/picnic/_createPincnic.scss';
import Header from '../../public_component/Header';
import Footer from '../../public_component/Footer';
import BackToTop from '../../public_component/BackToTop';
function CreatePincnic() {
  return (
    <>
      <Header />
      <main className="createPincnicMain container">
        <form className="d-flex flex-column">
          <div className="form d-flex flex-column my-3">
            <label className="">封面照片</label>
            <input type="file" name="pic" className="picUpload" />
          </div>
          <div className="form d-flex flex-column mb-3">
            <label className="">活動標題</label>
            <input type="text" />
          </div>
          <div className="form d-flex flex-column mb-3">
            <label className="">活動日期</label>
            <input type="date" />
          </div>
          <div className="form d-flex flex-column mb-3">
            <label className="">活動時間</label>
            <input type="time" />
          </div>
          {/* <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">縣市</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="col-md-4">
              <label className="form-label">區域</label>
              <select className="form-select">
                <option>XX區</option>
                <option>XX區</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">地址</label>
              <input type="text" className="form-control" />
            </div>
          </div> */}
          <div className="form mb-3">
            <label className="">活動地點</label>
            <div className="row m-auto">
              <input
                type="text"
                name=""
                value="台北市"
                className="col-2 mb-2"
                readonly
                disabled
              />
              <select className=" col-2 ms-1 mb-2">
                <option value="">XX區</option>
              </select>
              <input type="text" className="col-sm-12" />
            </div>
          </div>
          <div className="form d-flex flex-column mb-3">
            <label>活動人數 (最低人數5人)</label>
            <input type="number" />
          </div>
          <div className="form d-flex flex-column mb-3">
            <label>活動預估費用</label>
            <input type="number" />
          </div>
          <div className="form d-flex flex-column mb-3">
            <label>報名起始日</label>
            <input type="date" />
          </div>
          <div className="form d-flex flex-column mb-3">
            <label>報名結束日</label>
            <input type="date" />
          </div>
          <div className="form d-flex flex-column mb-5">
            <label>活動內容</label>
            <input type="text" className="contentDetail" />
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
