import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const inputAddress = () => {
  return (
    <div className="addressGroup " css={addressGroup}>
      <label for="address">　　地址：</label>
      <select>
        <option value="桃園市">桃園市</option>
      </select>
      <select>
        <option value="中壢區">中壢區</option>
      </select>
      <input
        value="新生路二段421號"
        type="text"
        name="address"
        id="address"
        css={input}
      />
    </div>
  );
};

export default inputAddress;

const addressGroup = css`
  line-height: 3rem;
  select {
    border-radius: 10px;
    margin: 0 5px;
  }
  input {
    margin-left: 4.8rem;
  }
`;

const input = css`
  border-radius: 10px;
  height: 20px;
  padding: 15px 0px 15px 5px;
  width: 300px;
`;
