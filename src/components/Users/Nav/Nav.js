import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  BsFillPersonFill,
  BsFillTreeFill,
  BsCreditCard2FrontFill,
  BsFillBookmarkHeartFill,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { MdArticle, MdDateRange } from 'react-icons/md';
import { GiBowlOfRice } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useUserRights } from '../../../usecontext/UserRights';

const icon = [
  <BsFillPersonFill />,
  <MdArticle />,
  <BsCreditCard2FrontFill />,
  <BsFillTreeFill />,
  <GiBowlOfRice />,
  <BsFillBookmarkHeartFill />,
  <MdDateRange />,
];
const userNav = [
  {
    title: '個人檔案',
    url: '/users/account',
    item: [{ title: '更改密碼', url: 'password' }],
  },
  {
    title: '訂單查詢',
    url: '/users/order',
    item: [{ title: '', url: '' }],
  },
  {
    title: 'LIFE點數',
    url: '/users/points',
    item: [{ title: '', url: '' }],
  },
  {
    title: '活動一覽',
    url: '/users/caping',
    item: [
      { title: '露營活動', url: 'caping' },
      { title: '野餐活動', url: 'picnic' },
    ],
  },
  {
    title: '食譜一覽',
    url: '/users/recipe?p=1',
    item: [
      { title: '我的食譜', url: 'recipe?p=1' },
      { title: '食譜收藏', url: 'recipe?p=2' },
    ],
  },
  {
    title: '商品收藏',
    url: '/users/product',
    item: [{ title: '', url: '' }],
  },
  {
    title: '行事曆',
    url: '/users/calendar',
    item: [{ title: '', url: '' }],
  },
];

const AccordionItem = (props) => {
  const [heightItem, setHeightItem] = useState(0);
  useEffect(() => {
    setHeightItem(
      props.visable
        ? document.getElementById(`item_${props.index}`).scrollHeight
        : 0
    );
  });
  const { item, index, setVisable } = props;
  return (
    <li onClick={() => setVisable(index)}>
      {icon[index]}
      <Link
        onClick={() => {
          props.setNavSwitch(false);
        }}
        to={item.url}
      >
        {item.title}
      </Link>
      {item.item.map((v2, i2) => {
        return (
          <ul key={i2}>
            <li
              className="expand"
              style={{ height: heightItem }}
              id={`item_${index}`}
            >
              <Link
                to={v2.url}
                onClick={() => {
                  props.setNavSwitch(false);
                }}
              >
                {v2.title}
              </Link>
            </li>
          </ul>
        );
      })}
    </li>
  );
};
const Nav = () => {
  const { user, setUser } = useUserRights();
  //登出
  async function handelLogout() {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
    setUser(null);
  }

  const [visable, setVisable] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const setVisableChild = (key) => {
    setVisable(visable.map((one, index) => (key == index ? true : false)));
  };
  const [navSwitch, setNavSwitch] = useState(false);
  return (
    <>
      <div
        className="nav"
        css={nav}
        style={{
          transform: navSwitch ? 'translateX(-40px)' : 'translateX(-300px)',
        }}
      >
        <IconContext.Provider value={{ color: 'balck', className: 'icon' }}>
          <ul className="list">
            {userNav.map((item, index) => {
              return (
                <AccordionItem
                  item={item}
                  key={index}
                  index={index}
                  visable={visable[index]}
                  setVisable={setVisableChild}
                  setNavSwitch={setNavSwitch}
                />
              );
            })}
            <li onClick={handelLogout} className="logout">
              <FiLogOut />
              登出
            </li>
          </ul>
        </IconContext.Provider>
      </div>
      <div
        onClick={() => {
          setNavSwitch(false);
        }}
        className="mask"
        css={mask}
        style={{
          // display: navSwitch ? 'block' : 'none',
          transform: navSwitch ? 'translateX(0px)' : 'translateX(400px)',
        }}
      ></div>
      {!navSwitch ? (
        <button
          css={navBtn}
          className="navBtn"
          onClick={() => {
            navSwitch ? setNavSwitch(false) : setNavSwitch(true);
          }}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      ) : null}
    </>
  );
};
export default Nav;
const mask = css`
  display: none;
  transition: 0.5s;
  @media (max-width: 768px) {
    margin-top: -65px;
    display: block;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 400;
  }
`;
const navBtn = css`
  display: none;
  transition: 0.5s;
  border: 0;
  width: 15px;
  height: 30px;
  @media (max-width: 768px) {
    background: rgba(129, 113, 97, 0.5);
    color: #fff;
    display: block;
    position: fixed;
    top: 60%;
    z-index: 401;
    margin-top: -65px;
  }
`;
const nav = css`
  font-size: 16px;
  padding-top: 100px;
  width: 250px;
  line-height: 3.5rem;
  border-right: 1px solid #ccc;
  transition: 0.5s;
  position: relative;
  left: 300px;
  @media (max-width: 768px) {
    left: 0;
    border: 1px solid #666;
    height: 100vh;
    margin: 0;
    background: #817161;
    color: #fff;
    position: fixed;
    transform: translateX(-300px);
    margin-top: -65px;
    z-index: 999;
    a {
      color: #fff;
    }
  }

  .list {
    margin: 0 auto;
    padding: 0;
    ul {
      padding-left: 40px;
    }
  }
  .icon {
    margin: 10px;
    margin-bottom: 12px;
  }
  .expand {
    overflow: hidden;
    transition: 0.5s;
    height: 0px;
  }
  .logout {
    cursor: pointer;
  }
`;
