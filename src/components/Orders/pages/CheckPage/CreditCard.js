import React, { useState, useRef, useEffect } from 'react';
import '../../../../styles/Order/creditCard.scss';
import { Field, ErrorMessage } from 'formik';

function CreditCard({ values, setFieldValue }) {
  const [isFlip, setIsFlip] = useState(false);
  const cardNumRef = useRef(null);
  const cardMonthRef = useRef(null);
  const cardYearRef = useRef(null);
  const cardCvcRef = useRef(null);
  const cardNameRef = useRef(null);
  const [cardNum, setCardNum] = useState('');
  const [focusSec, setFocusSec] = useState(0);
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const makeOptions = (min, max) => {
    const options = [];
    for (let i = min; i < max + 1; i++) {
      options.push(String(i));
    }
    return options;
  };

  useEffect(() => {
    // console.log(values.cardNumber);
    setCardNum(values.cardNumber);
  }, [values.cardNumber]);

  useEffect(() => {
    setCardCvc(values.cardCvc);
  }, [values.cardCvc]);
  console.log(cardCvc);

  useEffect(() => {
    setCardName(values.cardName);
  }, [values.cardName]);

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

  // console.log(cardNumRows);

  let cardExpirationDate = 'MM/YY';

  cardExpirationDate = cardExpirationDate.replace(
    /MM/,
    values.cardMonth || 'MM'
  );
  cardExpirationDate = cardExpirationDate.replace(
    /YY/,
    values.cardYear || 'YY'
  );

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
                      {({ field }) => {
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
                <Field name="cardName">
                  {({ field }) => {
                    return (
                      <>
                        <label className="mb-2">持卡人</label>
                        <input
                          type="text"
                          {...field}
                          ref={cardNameRef}
                          values={values.cardName}
                          onFocus={() => {
                            setIsFlip(false);
                          }}
                        />
                        <ErrorMessage name="cardName">
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
            <div className="row align-items-center gap-2">
              <div className="col">
                <label className="mb-2">到期日</label>
                <div className="row gap-2 align-items-baseline">
                  <div className="col">
                    <Field name="cardMonth">
                      {({ field }) => {
                        return (
                          <>
                            <select
                              {...field}
                              ref={cardMonthRef}
                              value={values.cardMonth}
                              onFocus={() => {
                                setIsFlip(false);
                              }}
                            >
                              <option value="">月</option>
                              {makeOptions(1, 12).map((v, i) => {
                                return (
                                  <option key={i} value={v}>
                                    {v}
                                  </option>
                                );
                              })}
                            </select>
                            <ErrorMessage name="cardMonth">
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
                    <Field name="cardYear">
                      {({ field }) => {
                        return (
                          <>
                            <select
                              {...field}
                              ref={cardYearRef}
                              value={values.cardYear}
                              onFocus={() => {
                                setIsFlip(false);
                              }}
                            >
                              <option value="">年</option>
                              {makeOptions(2020, 2031).map((v, i) => {
                                return (
                                  <option key={i} value={v}>
                                    {v}
                                  </option>
                                );
                              })}
                            </select>
                            <ErrorMessage name="cardYear">
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

              <div className="col">
                <Field name="cardCvc">
                  {({ field }) => {
                    return (
                      <>
                        <label className="mb-2">安全碼</label>
                        <input
                          type="text"
                          maxLength={3}
                          {...field}
                          ref={cardCvcRef}
                          values={values.cardCvc}
                          onFocus={() => {
                            setIsFlip(true);
                          }}
                        />
                        <ErrorMessage name="cardCvc">
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
            <div className={`cCard  ${isFlip ? 'active' : ''}`}>
              <div className="cardFront">
                <div className="cardBackground">
                  <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
                </div>
                <div className="cardWrapper">
                  <div className="cardTop">
                    <div className="cardChipIcon">
                      <img src="https://i.imgur.com/7xhP2ZA.png" alt="" />
                    </div>
                    <div className="cardVisaIcon">
                      <img src="https://i.imgur.com/lokBLnp.png" alt="" />
                    </div>
                  </div>
                  <div
                    className={`cardNumber ${focusSec === 1 ? 'active' : ''}`}
                  >
                    {getCardNum()}
                  </div>
                  <div className="cardContent">
                    <div className="cardHolder">
                      <div className="cardHolderTitle">Card Holder</div>
                      <div className="cardHolderName" ref={cardNameRef}>
                        <span>{cardName || 'FULL NAME'}</span>
                      </div>
                    </div>
                    <div className="cardExpires">
                      <div className="cardExpiresTitle">Expires</div>
                      <div className="cardExpiresDate">
                        {cardExpirationDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cardBack">
                <div className="cardBackground">
                  <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
                </div>
                <div className="cardTop">
                  <div className="cardBlackLine"></div>
                </div>
                <div className="cardCvc">
                  <div className="cardCvcTitle">
                    <span ref={cardCvcRef}>{cardCvc}</span>
                  </div>
                  <div className="cardCvcNumber"></div>
                </div>
                <div className="cardBottom">
                  <div className="cardVisaIcon">
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
