import React from 'react';
import Footer from '../public_component/Footer';
import Header from '../public_component/Header';
import BackToTop from '../public_component/BackToTop';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/_news.scss';

const newsData = [
  {
    id: 1,
    category: 1,
    date: '2022-07-01',
    content:
      'TOSHIBA 東芝上架了最新商品 " 8公升日式小烤箱 "，適合小家庭烹調使用，歡迎立即前往選購！',
    categoryName: '最新商品',
  },
  {
    id: 2,
    category: 1,
    date: '2022-07-05',
    content:
      'SAMPO 聲寶上架了最新商品 " 32公升雙溫控旋風電烤箱 "，適合有雙溫控需求的人使用，歡迎前往選購！',
    categoryName: '最新商品',
  },
  {
    id: 3,
    category: 1,
    date: '2022-07-11',
    content:
      'Sodastream 上架了最新商品 " power source "，非常適合飲用氣泡水的家庭購買使用！',
    categoryName: '最新商品',
  },
  {
    id: 4,
    category: 2,
    date: '2022-07-18',
    content:
      'CHIMEI 奇美商品將於 2022/08/01-2022/08/08 舉行 88節優惠活動，請鎖定優惠期間購買～',
    categoryName: '最新優惠',
  },
  {
    id: 5,
    category: 3,
    date: '2022-07-25',
    content:
      '最新露營活動 Fun Camping 為朵娜朵露營區舉辦，最適合喜愛懶人露營的你。',
    categoryName: '活動專區',
  },
  {
    id: 6,
    category: 2,
    date: '2022-08-02',
    content: 'Kolin 歌林將於 2022/08/08 舉行88節限時搶購優惠，絕對不能錯過！',
    categoryName: '最新優惠',
  },
  {
    id: 7,
    category: 3,
    date: '2022-08-15',
    content:
      '想體驗身處於秘境之中的露營嗎？半島秘境 即將舉辦最新露營活動 " 秘境探險 "。',
    categoryName: '活動專區',
  },
  {
    id: 8,
    category: 1,
    date: '2022-08-30',
    content:
      'SONGEN 松井上架了最新商品 " 輕食煮義減脂美食氣炸鍋 "，想保持精實身材的您絕不能錯過這次的商品。',
    categoryName: '最新商品',
  },
  {
    id: 9,
    category: 3,
    date: '2022-09-05',
    content:
      '來一趟說走就走的露營，全新露營活動 " 露營說走就走 "，將在 MON JOU 野奢露營莊園 舉行！',
    categoryName: '活動專區',
  },
  {
    id: 10,
    category: 3,
    date: '2022-09-28',
    content:
      '來體驗農場裡的露營吧！" 露營 x 農場 " 將在自然圈農場舉辦，即刻前往報名！',
    categoryName: '活動專區',
  },
];
const newsDataS = newsData.map((d) => {
  return { ...d, yearMonth: d.date.slice(0, 7) };
});
console.log(newsDataS);

const News = () => {
  return (
    <>
      <Header />
      <div className="newsPage">
        <div className="title">
          <span className="en">最新消息</span>
          <span className="ch">WHAT'S NEW</span>
        </div>
        <div className="news py-3">
          {newsDataS.map((d, i) => {
            let yearSection = '';
            let nextYearMonth = false;
            if (i === 0) {
              yearSection = d.yearMonth;
            } else if (d.yearMonth === newsDataS[i - 1].yearMonth) {
              nextYearMonth = true;
              yearSection = '';
            } else {
              yearSection = d.yearMonth;
            }
            return (
              <div key={uuidv4()} className="newsItem">
                <div
                  className={`yearMonth text-nowrap py-3 pe-3 ${
                    nextYearMonth && 'border-top-0'
                  }`}
                >
                  {yearSection}
                </div>
                <div className="newMainContainer py-3 ps-3 d-flex">
                  <div className="day me-3">{d.date.slice(-2)}</div>
                  <div className="content">
                    <div className="type mb-1">{d.categoryName}</div>
                    <div className="text">{d.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default News;
