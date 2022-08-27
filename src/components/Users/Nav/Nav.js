import React from 'react';
import {
  BsFillPersonFill,
  BsFillTreeFill,
  BsCreditCard2FrontFill,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { MdArticle } from 'react-icons/md';
import { GiBowlOfRice } from 'react-icons/gi';
import CAT from '../cat.jpg';
import { IconContext } from 'react-icons';

const Nav = () => {
  return (
    <IconContext.Provider
      value={{ color: 'balck', className: 'global-class-name' }}
    >
      <div className="sidemenu">
        <div className="user_information">
          <div className="avatar">
            <img src={CAT} alt="" />
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
              <a href="#/">個人檔案</a>
              <ul>
                <li>
                  <a href="#/">更改密碼</a>{' '}
                </li>
              </ul>
            </li>
            <li>
              <MdArticle />
              <a href="#/">訂單查詢</a>{' '}
            </li>
            <li>
              <BsCreditCard2FrontFill />
              <a href="#/">LIFE點數</a>{' '}
            </li>
            <li>
              <BsFillTreeFill />
              <a href="#/">活動一覽</a>
              <ul>
                <li>
                  <a href="#/">露營活動</a>{' '}
                </li>
                <li>
                  <a href="#/">野餐活動</a>{' '}
                </li>
              </ul>
            </li>
            <li>
              <GiBowlOfRice />
              <a href="#/">食譜一覽</a>{' '}
            </li>
            <li>
              <FiLogOut />
              <a href="#/">登出</a>{' '}
            </li>
          </ul>
        </nav>
      </div>
    </IconContext.Provider>
  );
};

export default Nav;
