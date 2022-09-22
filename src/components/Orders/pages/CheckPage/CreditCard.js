import React, { useState, useRef, useEffect } from 'react';
import '../../../../styles/Order/creditCard.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';

function CreditCard({ values, setFieldValue }) {
  const [isFlip, setIsFlip] = useState(false);
  const cardNumRef = useRef(null);
  const cardMonth = useRef(null);
  const cardDate = useRef(null);
  const cardCheck = useRef(null);
  const [cardNum, setCardNum] = useState('');
  const [focusSec, setFocusSec] = useState(0);
  const [cardCcv, setCardCcv] = useState('');

  // console.log('first', cardNum);

  // switch (focusSec) {
  //   case 1:
  //     return;
  // }

  useEffect(() => {
    // console.log(values.cardNumber);
    setCardNum(values.cardNumber);
  }, [values.cardNumber]);

  useEffect(() => {
    setCardCcv(values.cCardCheck);
  }, [values.cCardCheck]);
  console.log(cardCcv);

  let cardNumRows = cardNum.split('');
  // console.log(cardNumRows);

  // cardNumRows.forEach((s, i) => {
  //   if (i === 4 || i === 9 || i === 14) {
  //     cardNumRows.splice(i, 0, ' ');
  //   }
  // });
  // let cardNumRow = [];

  const getCardNum = () => {
    let cardNumRow = [];
    for (let i = 0; i < cardNumRows.length; i++) {
      cardNumRow.push(
        <span className={i === 3 || i === 7 || i === 11 ? 'space' : ''}>
          {cardNumRows[i]}
        </span>
      );
    }
    return cardNumRow;
  };

  console.log(cardNumRows);

  return (
    <>
      <div className="cCardLayout">
        <div className="row align-items-center gap-3 ">
          <div className="col-6 px-5 py-3 cardInput">
            <div className="row mb-3">
              <div className="col">
                <div className="row gap-2 align-items-baseline">
                  <div className="col">
                    <Field name="cardNumber">
                      {({ field, meta }) => {
                        return (
                          <>
                            <label className="mb-2">卡號</label>
                            <input
                              type="text"
                              maxLength={16}
                              {...field}
                              ref={cardNumRef}
                              value={values.cardNumber}
                              onFocus={(e) => {
                                setIsFlip(false);
                                setFocusSec(1);
                                console.log('focus');
                              }}
                              onBlur={(e) => {
                                // setFocusSec(0);
                                console.log('blur');
                              }}
                            />
                            <ErrorMessage name="cardNumber">
                              {(err) => {
                                <p className="text-danger">{err}</p>;
                              }}
                            </ErrorMessage>
                          </>
                        );
                      }}
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="mb-2">到期日</label>
                <div className="row gap-2 align-items-baseline">
                  <div className="col">
                    <Field name="cCardMonth" as="select">
                      {({ field, meta }) => {
                        return (
                          <>
                            <select
                              {...field}
                              ref={cardMonth}
                              values={values.cCardMonth}
                              onFocus={() => {
                                setIsFlip(false);
                              }}
                            ></select>
                            <ErrorMessage name="cCardMonth">
                              {(err) => {
                                <p className="text-danger">{err}</p>;
                              }}
                            </ErrorMessage>
                          </>
                        );
                      }}
                    </Field>
                  </div>
                  /
                  <div className="col">
                    <Field name="cCardDate">
                      {({ field, meta }) => {
                        return (
                          <>
                            <input
                              type="text"
                              maxLength={2}
                              {...field}
                              ref={cardDate}
                              values={values.cCardDate}
                              onFocus={() => {
                                setIsFlip(false);
                              }}
                            />
                            <ErrorMessage name="cCardDate">
                              {(err) => {
                                <p className="text-danger">{err}</p>;
                              }}
                            </ErrorMessage>
                          </>
                        );
                      }}
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <Field name="cCardCheck">
                  {({ field }) => {
                    return (
                      <>
                        <label className="mb-2">安全碼</label>
                        <input
                          type="text"
                          maxLength={3}
                          {...field}
                          ref={cardCheck}
                          values={values.cCardCheck}
                          onFocus={() => {
                            setIsFlip(true);
                          }}
                        />
                        <ErrorMessage name="cCardCheck">
                          {(err) => {
                            <p className="text-danger">{err}</p>;
                          }}
                        </ErrorMessage>
                      </>
                    );
                  }}
                </Field>
              </div>
            </div>
          </div>
          <div className="col px-5 py-3">
            {/* TODO: focus */}
            <div className={`cCard  ${isFlip ? 'active' : ''}`}>
              <div className="cardFront">
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
                    // TODO: border
                    className={`cardNumber ${focusSec === 1 ? 'active' : ''}`}
                    onClick={() => {
                      // handleSetFocusSection('cc-number');
                      // handleSetIsInputFocused(true);
                    }}
                    // ref={cardItemRefs.ccNumberRef}
                  >
                    {getCardNum()}
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
                    <span ref={cardCheck}>{cardCcv}</span>
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
