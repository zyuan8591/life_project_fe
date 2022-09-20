import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import TextField from '../../component/TextField';
import RecipientSelect from '../../component/RecipientSelect';
import jsondata from '../../../../utils/CityCountyData.json';
import { Field } from 'formik';

function RecipientInfo({ values, delivery }) {
  // console.log(values);

  return (
    <>
      <h2 className="mb-3">
        <AiOutlineUser /> 收件者資訊
      </h2>

      <div className="recipient">
        <div className="row recipientInfo">
          <div className="col-6 mb-2">
            <TextField name="name" maxLength={10} label="姓名" />
          </div>

          <div className="col-6 mb-2">
            <TextField name="phone" maxLength={10} label="電話" />
          </div>

          <div className="col-12 mb-2">
            <TextField name="email" type="text" label="Email" />
          </div>

          <div className="col-12 mb-2">
            <RecipientSelect name="delivery" label="運送方式">
              <option value="">--請選擇--</option>
              {delivery.map((v, i) => {
                return (
                  <>
                    <option key={v.id} value={v.id}>
                      {v.order_delivery}
                    </option>
                  </>
                );
              })}
              ;
            </RecipientSelect>
          </div>
          <div className="col-12 mb-2 address">
            <label className="mb-2">地址</label>
            <div className="row gap-2">
              <div className="col">
                <div className="row gap-2">
                  <div className="col">
                    <RecipientSelect name="cityName">
                      <option value="">請選擇</option>
                      {jsondata.map((v, i) => {
                        return (
                          <option
                            key={Math.random().toString(36).replace('0.', '')}
                            value={v.CityName}
                          >
                            {v.CityName}
                          </option>
                        );
                      })}
                    </RecipientSelect>
                  </div>

                  <div className="col">
                    <RecipientSelect name="areaName">
                      <option value="">請選擇</option>
                      {jsondata
                        .filter((v) => v.CityName === values.cityName)
                        .map((v, i) => {
                          <option
                            key={Math.random().toString(36).replace('0.', '')}
                          ></option>;
                          return v.AreaList.map((v2, i2) => {
                            return (
                              <option key={i2} value={v2.AreaName}>
                                {v2.AreaName}
                              </option>
                            );
                          });
                        })}
                    </RecipientSelect>
                  </div>
                </div>
              </div>
              <div className="col">
                <TextField name="address" />
              </div>
            </div>
          </div>
          <div className="col-12 mb-2">
            <label className="mb-2">備註</label>
            <Field name="memo" as="textarea" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipientInfo;
