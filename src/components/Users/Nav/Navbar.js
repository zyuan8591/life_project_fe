import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  BsFillPersonFill,
  BsFillTreeFill,
  BsCreditCard2FrontFill,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { MdArticle } from 'react-icons/md';
import { GiBowlOfRice } from 'react-icons/gi';
import { IconContext } from 'react-icons';

const Navbar = () => {
  return (
    <IconContext.Provider value={{ color: 'balck', className: 'icon' }}>
      <nav css={nav}>
        <ul className="list">
          <li>
            <BsFillPersonFill />
            <Link to="/users/account">個人檔案</Link>
            <ul>
              <li>
                <a href="/users/password">更改密碼</a>
              </li>
            </ul>
          </li>
          <li>
            <MdArticle />
            <Link to="/users/order">訂單查詢</Link>
          </li>
          <li>
            <BsCreditCard2FrontFill />
            <Link to="/users/points">LIFE點數</Link>
          </li>
          <li>
            <BsFillTreeFill />
            <Link to="/users/camping">活動一覽</Link>
            <ul>
              <li>
                <Link to="/users/camping">露營活動</Link>
              </li>
              <li>
                <Link to="/users/picnic">野餐活動</Link>
              </li>
            </ul>
          </li>
          <li>
            <GiBowlOfRice />
            <Link to="/users/recipe">食譜一覽</Link>
          </li>
          <li>
            <FiLogOut />
            <Link to="">登出</Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;

const nav = css`
  padding: 15px 0 0 20%;
  line-height: 3.3rem;
  transition: all 0.3s;
  .icon {
    margin: 10px;
  }

  .list {
    transition: all 0.3s;
    li:hover ul {
    }
    ul {
      padding-left: 3.5rem;
    }
  }
`;
