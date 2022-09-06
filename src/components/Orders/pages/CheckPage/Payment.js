import React from 'react';
import CreditCard from './CreditCard';

function Payment() {
  return (
    <>
      <h2 className="mb-3">付款方式</h2>

      <div className="payment">
        <div className="mb-2 px-2">
          <input type="radio" className="me-3" />
          <label>ATM／銀行臨櫃匯款</label>
          <p className="px-5">
            1、選擇"ATM付款"即生成供本次使用的銀行虛擬帳號與唯一的訂單編號（轉帳時請務必輸入正確帳號，避免轉錯帳號造成損失）
            <br />
            2、虛擬帳號從生成之時起在24小時內有效，超時則無法付款成功
          </p>
        </div>
        <div className="mb-2 px-2">
          <input type="radio" className="me-3" />
          <label>LinePay</label>
        </div>
        <div className="mb-2 px-2">
          <input type="radio" className="me-3" />
          <label>綠界</label>
        </div>
        <div className="mb-2 px-2">
          <input type="radio" className="me-3" />
          <label className="mb-4">信用卡</label>
          <CreditCard />
        </div>
      </div>
    </>
  );
}

export default Payment;
