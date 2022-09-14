import React from 'react';
import '../../../../styles/Order/creditCard.scss';

function CreditCard() {
  return (
    <>
      <div className="cCardLayout">
        <div className="row align-items-center gap-3">
          <div className="col-6 pe-3">
            <div className="row align-items-center mb-3">
              <label className="col text-end me-3">卡號</label>
              <div className="col-9">
                <div className="row gap-2 align-items-center">
                  <div className="col">
                    <input maxLength={4} className="cCardInput" />
                  </div>
                  -
                  <div className="col">
                    <input maxLength={4} className="cCardInput" />
                  </div>
                  -
                  <div className="col">
                    <input maxLength={4} className="cCardInput" />
                  </div>
                  -
                  <div className="col">
                    <input maxLength={4} className="cCardInput" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <label className="col text-end me-3">到期日</label>
              <div className="col-9">
                <div className="row gap-3 align-items-center">
                  <div className="col">
                    <input maxLength={2} className="cCardInput" />
                  </div>
                  /
                  <div className="col">
                    <input maxLength={2} className="cCardInput" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <label className="col text-end me-3">安全碼</label>
              <div className="col-9">
                <div className="row gap-2 align-items-center">
                  <div className="col">
                    <input maxLength={3} className="cCardInput" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col ps-3">
            <img src="/img/orders/creditcard.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCard;
