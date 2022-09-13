import React, { useState, useEffect } from 'react';
import CreditCard from './CreditCard';
function Payment() {
  const [payment, setPayment] = useState('');
  const paymentOptions = ['ATM/銀行臨櫃匯款', 'LinePay', '綠界', '信用卡'];
  const [isVisa, setIsVisa] = useState(false);
  const [isAtm, setIsAtm] = useState(false);

  useEffect(() => {
    if (payment === 'ATM/銀行臨櫃匯款') {
      setIsAtm(true);
      setIsVisa(false);
    } else if (payment === '信用卡') {
      setIsVisa(true);
      setIsAtm(false);
    } else {
      setIsAtm(false);
      setIsVisa(false);
    }
  }, [payment]);

  return (
    <>
      <h2 className="mb-3">付款方式</h2>

      <div className="payment">
        {paymentOptions.map((v, i) => {
          return (
            <>
              <div
                className="mb-2 px-2"
                key={Math.random().toString(36).replace('0.', '')}
              >
                <input
                  type="radio"
                  className="me-3"
                  value={v}
                  checked={payment === v}
                  onChange={(e) => {
                    setPayment(e.target.value);
                  }}
                />
                <label>{v}</label>
                {(i === 0 && isAtm && (
                  <>
                    <p className="px-5">
                      1、選擇"ATM付款"即生成供本次使用的銀行虛擬帳號與唯一的訂單編號（轉帳時請務必輸入正確帳號，避免轉錯帳號造成損失）
                      <br />
                      2、虛擬帳號從生成之時起在24小時內有效，超時則無法付款成功
                    </p>
                  </>
                )) ||
                  (i === 3 && isVisa && (
                    <>
                      <CreditCard />
                    </>
                  ))}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Payment;
