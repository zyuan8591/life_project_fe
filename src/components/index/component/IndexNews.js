import React from 'react';
import classes from '../../../styles/moduleCss/indexNews.module.scss';

const data = [
  {
    id: 1,
    date: '2022.08.26',
    category: '最新商品',
    content:
      'TOSHIBA 東芝上架了最新商品 " 8公升日式小烤箱 "，適合小家庭烹調使用，歡迎立即前往選購！',
  },
  {
    id: 2,
    date: '2022.07.25',
    category: '最新商品',
    content:
      'SAMPO 聲寶上架了最新商品 " 32公升雙溫控旋風電烤箱 "，適合有雙溫控需求的人使用，歡迎前往選購！',
  },
  {
    id: 3,
    date: '2022.06.20',
    category: '最新商品',
    content:
      'SONGEN 松井上架了最新商品 " 輕食煮義減脂美食氣炸鍋 "，想保持精實身材的您絕不能錯過這次的商品。',
  },
];

const IndexNews = ({ className }) => {
  return (
    <>
      <ul className="ps-0">
        {data.map((d) => {
          return (
            <li key={d.id} className={classes.newsContainer}>
              <span>{d.date}</span>
              <div className={`text-nowrap ${classes.category}`}>
                {d.category}
              </div>
              <span>{d.content}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default IndexNews;
