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

const userNav = [
  {
    icon: 'BsFillPersonFill',
    title: '個人檔案',
    url: '',
    item: [{ titile: '更改密碼', url: '/users/password' }],
  },
  {
    icon: 'MdArticle ',
    title: '訂單查詢',
    url: '',
    item: ['users/order'],
  },
  {
    icon: 'BsCreditCard2FrontFill',
    title: 'LIFE點數',
    url: 'users/points',
    item: [''],
  },
  {
    icon: 'BsFillTreeFill',
    title: '活動一覽',
    url: 'users/camping',
    item: [
      { titile: '露營活動', url: 'users/camping' },
      { titile: '野餐活動', url: 'users/camping' },
    ],
  },
  {
    icon: 'GiBowlOfRice',
    title: '食譜一覽',
    url: '/users/recipe',
    item: [
      { titile: '我的食譜', url: '/users/recipe' },
      { titile: '食譜收藏', url: '/users/recipe' },
    ],
  },
  { icon: 'FiLogOut', title: '登出' },
];

const Recipe = () => {
  return (
    <>
      {userNav.map((v, i) => {
        return (
          <ul>
            <li>
              <Link to={v.url}>{v.title}</Link>
              {v.item.map((item, i) => {
                return (
                  <ul>
                    <li>
                      <Link to={item.url}>{item.title}</Link>
                    </li>
                  </ul>
                );
              })}
            </li>
          </ul>
        );
      })}
      {/* <IconContext.Provider
        value={{ color: 'balck', className: 'icon' }}
      ></IconContext.Provider> */}
    </>
  );
};
export default Recipe;

// const nav = css`
//   padding: 15px 0 0 20%;
//   line-height: 3.3rem;
//   transition: all 0.3s;
//   .icon {
//     margin: 10px;
//   }

//   .list {
//     transition: all 0.3s;
//     li:hover ul {
//     }
//     ul {
//       padding-left: 3.5rem;
//     }
//   }
// `;
