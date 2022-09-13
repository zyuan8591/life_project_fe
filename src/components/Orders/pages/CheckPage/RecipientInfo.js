import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

function RecipientInfo() {
  return (
    <>
      <h2 className="mb-3">
        <AiOutlineUser /> 收件者資訊
      </h2>

      <div className="recipient">
        <div className="row recipientInfo">
          <div className="col-6 mb-2">
            <label className="mb-2">姓名</label>
            <input type="text" className="recipientInput" />
          </div>
          <div className="col-6">
            <label className="mb-2">電話</label>
            <input type="text" className="recipientInput" />
          </div>
          <div className="col-12 mb-2">
            <label className="mb-2">Email</label>
            <input type="text" className="recipientInput" />
          </div>
          <div className="col-12 mb-2">
            <label className="mb-2">運送方式</label>
            <input type="text" className="recipientInput" />
          </div>
          <div className="col-12 mb-2">
            <label className="mb-2">地址</label>
            <input type="text" className="recipientInput" />
          </div>
          <div className="col-12 mb-2">
            <label className="mb-2">備註</label>
            <textarea className="recipientInput" placeholder='最多100字' />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipientInfo;
