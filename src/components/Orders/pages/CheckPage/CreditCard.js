import React from 'react';
import '../../../../styles/Order/creditCard.scss';
import TextField from '../../component/TextField';

function CreditCard({ values }) {
  return (
    <>
      <div className="cCardLayout">
        <div className="row align-items-center gap-3 ">
          <div className="col-6 px-5 py-3 cardInput">
            <div className="row mb-3">
              <div className="col">
                <label className="mb-2">卡號</label>
                <div className="row gap-2 align-items-baseline">
                  <div className="col">
                    <TextField
                      name="cardNumber"
                      maxLength={12}
                      value={values.cardNumber}
                      // onChange={(e) => {
                      //   setFieldValue('cardNumber', values.cardNumber);
                      // }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="mb-2">到期日</label>
                <div className="row gap-2 align-items-baseline">
                  <div className="col">
                    <TextField
                      maxLength={2}
                      name="cCardMonth"
                      values={values.cCardMonth}
                    />
                  </div>
                  /
                  <div className="col">
                    <TextField
                      maxLength={2}
                      name="cCardDate"
                      values={values.cCardDate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <TextField
                  label="安全碼"
                  maxLength={3}
                  name="cCardCheck"
                  values={values.cCardCheck}
                />
              </div>
            </div>
          </div>
          <div className="col px-5 py-3">
            <div className="cCard">
              <div className="cardFront">
                <div className="focus-box" />
                <div className="cardBackground">
                  <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
                </div>
                <div className="cardWrapper">
                  <div className="card__top">
                    <div className="card__chip-icon">
                      <img src="https://i.imgur.com/7xhP2ZA.png" alt="" />
                    </div>
                    <div className="card__visa-icon">
                      <img src="https://i.imgur.com/lokBLnp.png" alt="" />
                    </div>
                  </div>
                  <div
                    className="card__card-number"
                    onClick={() => {
                      // handleSetFocusSection('cc-number');
                      // handleSetIsInputFocused(true);
                    }}
                    // ref={cardItemRefs.ccNumberRef}
                  >
                    {/* {cardNumberRow} */}
                  </div>
                  <div className="card__content">
                    <div
                      className="card__card-holder"
                      onClick={() => {
                        // handleSetFocusSection('cc-name');
                        // handleSetIsInputFocused(true);
                      }}
                      // ref={cardItemRefs.ccNameRef}
                    >
                      <div className="card__card-holder-title">Card Holder</div>
                      <div className="card__card-holder-name">
                        {/* {props.cardHolder || 'FULL NAME'} */}
                      </div>
                    </div>
                    <div
                      className="card__expires"
                      onClick={() => {
                        // handleSetFocusSection('cc-exp');
                        // handleSetIsInputFocused(true);
                      }}
                      // ref={cardItemRefs.ccExpRef}
                    >
                      <div className="card__expires-title">Expires</div>
                      <div className="card__expires-date">
                        {/* {cardExpirationDate} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cardBack">
                <div className="focus-box" />
                <div className="cardBackground">
                  <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
                </div>
                <div className="card__top">
                  <div className="card__black-line"></div>
                </div>
                <div className="card__card-cvc">
                  <div className="card__card-cvc-title">
                    {/* <span ref={cardItemRefs.ccCvcRef}>
                      {props.cardCVC || 'CVC'}
                    </span> */}
                  </div>
                  <div className="card__card-cvc-number"></div>
                </div>
                <div className="card__bottom">
                  <div className="card__visa-icon">
                    <img src="https://i.imgur.com/lokBLnp.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCard;
