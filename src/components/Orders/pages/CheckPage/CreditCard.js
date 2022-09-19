import React from 'react';
import '../../../../styles/Order/creditCard.scss';
import TextField from '../../component/TextField';
import { Field } from 'formik';

function CreditCard({ values, setFieldValue }) {
  console.log('cccccc',values);
  return (
    <>
      <div className="cCardLayout">
        <div className="row align-items-center gap-3">
          <div className="col-6 px-5 py-3">
            <div className="row mb-3">
              <div className="col">
                <label className="mb-2">卡號</label>
                <div className="row gap-2 align-items-baseline">
                  <div className="col">
                    <TextField
                      name="cCardNum1"
                      maxLength={4}
                      value={values.cCardNum1}
                      // onChange={(e) => {
                      //   setFieldValue(e.target.name, e.target.value);
                      // }}
                    />
                  </div>
                  -
                  <div className="col">
                    <TextField
                      name="cCardNum2"
                      maxLength={4}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  -
                  <div className="col">
                    <TextField
                      name="cCardNum3"
                      maxLength={4}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  -
                  <div className="col">
                    <TextField
                      name="cCardNum4"
                      maxLength={4}
                      values={values}
                      setFieldValue={setFieldValue}
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
                      values={values}
                      onChange={(e) => {
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  /
                  <div className="col">
                    <TextField
                      maxLength={2}
                      name="cCardDate"
                      values={values}
                      setFieldValue={setFieldValue}
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
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
          </div>
          <div className="col cCard">
            <img
              src="/img/orders/creditcard.jpg"
              alt=""
              className="objectCover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCard;
