import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Avata from './Avata';
import Navbar from './Navbar';

const Nav = () => {
  return (
    <div css={sidemenu}>
      <Navbar />
    </div>
  );
};

export default Nav;

const sidemenu = css`
  width: 20%;
  height: 100%;
  border-right: 2px solid #ccc;
  display: inline-block;
  padding: 15px;

  .user_information {
    display: flex;
    padding: 0 0 10px 20%;
    border-bottom: 1px solid #efefef;
    .avatar {
      overflow: hidden;
      border-radius: 50%;
      width: 80px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .information {
      margin-left: 15px;
    }
  }
`;
