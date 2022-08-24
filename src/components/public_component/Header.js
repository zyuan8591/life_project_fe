import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IconContext } from 'react-icons';
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineShopping,
} from 'react-icons/ai';

const pages = [
  { title: '首頁', route: '/' },
  { title: '商品', route: '/products' },
  { title: '食譜', route: '/recipes' },
  { title: '活動專區', route: '/activity' },
  { title: '最新消息', route: '/news' },
  { title: '聯絡我們', route: '/contact' },
];

const Header = ({ scrollDown }) => {
  const [page, setPage] = useState('首頁');
  return (
    <IconContext.Provider value={{ color: '#444', size: '2rem' }}>
      <header
        className={`header w-100 position-fixed ${scrollDown ? 'hidden' : ''}`}
      >
        <h1 className="mb-0 header-item">LIFE</h1>
        <nav className="flex-center header-item">
          <ul className="nav list-unstyled flex-center">
            {pages.map((p) => {
              return (
                <li key={uuidv4()}>
                  <Link
                    to={p.route}
                    className={`${page === p.title ? 'active' : ''}`}
                    onClick={() => {
                      setPage(p.title);
                    }}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="user flex-center header-item">
          <ul className="list-unstyled flex-center mb-0">
            {/* search */}
            <li className="me-3">
              <Link to="/" className="flex-center">
                <AiOutlineSearch />
              </Link>
            </li>
            {/* Like */}
            <li className="me-3">
              <Link to="/" className="flex-center">
                <AiOutlineHeart />
              </Link>
            </li>
            {/* Cart */}
            <li className="me-3">
              <Link to="/" className="flex-center">
                <AiOutlineShoppingCart />
              </Link>
            </li>
            {/* User */}
            <li className="me-3">
              <Link to="/" className="flex-center">
                <AiOutlineUser />
              </Link>
            </li>
            {/* Shop */}
            <li className="header-shop ps-3">
              <Link to="/" className="flex-center">
                <AiOutlineShopping />
                <span className="ms-3">SHOP</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </IconContext.Provider>
  );
};

export default Header;
