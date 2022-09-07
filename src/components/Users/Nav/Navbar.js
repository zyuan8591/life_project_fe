import React, { Component, useState, useEffect } from 'react';
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
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { UserRights } from '../../../usecontext/UserRights';

const icon = [
  <BsFillPersonFill />,
  <MdArticle />,
  <BsCreditCard2FrontFill />,
  <BsFillTreeFill />,
  <GiBowlOfRice />,
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
      { title: '野餐活動', url: 'caping' },
    ],
  },
  {
    title: '食譜一覽',
    url: '/users/recipe',
    item: [
      { title: '我的食譜', url: 'recipe' },
      { title: '食譜收藏', url: 'recipe' },
    ],
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
      <Link to={item.url}>{item.title}</Link>
      {item.item.map((v2, i2) => {
        return (
          <ul key={i2}>
            <li
              className="expand"
              style={{ height: heightItem }}
              id={`item_${index}`}
            >
              <Link to={v2.url}>{v2.title}</Link>
            </li>
          </ul>
        );
      })}
    </li>
  );
};
const Nav = () => {
  // const { user, setUser } = UserRights();
  //登出
  async function handelLogout() {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
    // setUser(null);
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
  return (
    <div css={nav}>
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
  );
};
export default Nav;
const nav = css`
  padding: 15px 0 0 20%;
  line-height: 3.3rem;

  .icon {
    margin: 10px;
  }
  .expand {
    overflow: hidden;
    transition: 0.5s;
    height: 0px;
  }

  ul {
    padding-left: 3.5rem;
  }
  .logout {
    cursor: pointer;
  }
`;
