import React from 'react';
import {
  BsFillPersonFill,
  BsFillTreeFill,
  BsCreditCard2FrontFill,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { MdArticle } from 'react-icons/md';
import { GiBowlOfRice } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { Routes, Route, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <IconContext.Provider
      value={{ color: 'balck', className: 'global-class-name' }}
    >
      <div className="sidemenu">
        <div className="user_information">
          <div className="avatar">
            <img src="/img/index/joinUs.jpg" alt="" />
          </div>
          <div className="information">
            <p>asd1235</p>
            <p>LIFE:100點</p>
          </div>
        </div>
        <nav>
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
              <Link to="/Users/recipe">食譜一覽</Link>
            </li>
            <li>
              <FiLogOut />
              <Link to="">登出</Link>
            </li>
          </ul>
        </nav>
      </div>
    </IconContext.Provider>
  );
};

export default Nav;
