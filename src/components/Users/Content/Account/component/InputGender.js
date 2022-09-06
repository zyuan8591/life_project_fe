import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const InputGender = () => {
  return (
    <div className="col-2 gendergroup " css={gendergroup}>
      <label for="gender">　　性別：</label>
      <input type="radio" name="gender" id="gender" />
      <label htmlFor="">男</label>
      <input type="radio" name="gender" id="gender" />
      <label htmlFor="">女</label>
      <input type="radio" name="gender" id="gender" />
      <label htmlFor="">其他</label>
    </div>
  );
};

export default InputGender;
const gendergroup = css`
  width: 100%;
  input {
    margin: 5px;
  }
`;
