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
import { MdArticle } from 'react-icons/md';
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
    url: '/users/recipe',
    item: [
      { title: '我的食譜', url: 'recipe' },
      { title: '食譜收藏', url: 'recipe' },
    ],
  },
  {
    title: '商品收藏',
    url: '/users/product',
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
  return (
    <div className="nav" css={nav}>
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
  font-size: 16px;
  padding-top: 100px;
  width: 250px;
  line-height: 3.5rem;
  border-right: 1px solid #ccc;
  .list {
    margin: 0 auto;
    padding: 0;
    ul {
      padding-left: 40px;
    }
  }
  .icon {
    margin: 10px;
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
