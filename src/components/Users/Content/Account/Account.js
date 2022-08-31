import React from 'react';

const Account = () => {
  return (
    <div className="account">
      <h3>個人檔案</h3>
      <form>
        <div className="frame">
          <div className="basic_information mt40">
            <div>
              <label> 　　姓名：</label>
              <input value="梓園園" type="text" name="" id="" />
            </div>
            <div>
              <label>註冊信箱：</label>
              <input value="test@gmial.com" type="text" name="" id="" />
            </div>
            <div>
              <label>手機號碼：</label>
              <input value="0912345646" type="text" name="" id="" />
            </div>
            <div>
              <label>　　生日：</label>
              <input value="1995/08/31" type="text" name="" id="" />
            </div>
            <div>
              <label>　　性別：</label>
              <input value="女" type="text" name="" id="" />
            </div>
            <div>
              <label>　　地址：</label>
              <input
                value="桃園市中壢區新生路二段421號"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="basic_information">
            <div className="avatar">
              <img src="/img/index/joinUs.jpg" alt="" />
            </div>
            <label className="introduction" htmlFor="">
              自我介紹：
            </label>
            <textarea
              name=""
              value="我叫紫園園，興趣是露營，希望有許多志同道合的朋友。"
            />
          </div>

          <div className="modifuBtn">
            <button>修改資料</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
