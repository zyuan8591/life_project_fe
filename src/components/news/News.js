import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_URL } from '../../utils/config';
import '../../styles/_news.scss';
import axios from 'axios';

const News = () => {
  const [newsData, setNewsData] = useState([]);

  // connect api with prop url
  const getData = async (url) => {
    let result = await axios.get(`${API_URL}${url}`);
    let data = result.data;
    data = data.map((d) => {
      return { ...d, yearMonth: d.date.slice(0, 7) };
    });
    setNewsData(data);
  };

  // get init data
  useEffect(() => {
    getData('/news');
  }, []);

  // get filter data
  const newsFilter = async (cate) => {
    getData(`/news?cate=${cate}`);
  };

  return (
    <>
      <div className="newsPage">
        {/* news title */}
        <div className="title cursorPointer" onClick={() => getData('/news')}>
          <span className="en">最新消息</span>
          <span className="ch">WHAT'S NEW</span>
        </div>

        {/* main news data */}
        <div className="news py-3">
          {newsData.map((d, i) => {
            let yearSection = '';
            let nextYearMonth = false;
            if (i === 0) {
              yearSection = d.yearMonth;
              // check if yearMonth is same as last data
            } else if (d.yearMonth === newsData[i - 1].yearMonth) {
              nextYearMonth = true;
              yearSection = '';
            } else {
              yearSection = d.yearMonth;
            }
            return (
              <div key={d.id} className="newsItem">
                <div
                  className={`yearMonth text-nowrap py-3 pe-3 ${
                    nextYearMonth && 'border-top-0'
                  } ${!nextYearMonth && 'bg-white'}`}
                >
                  {yearSection}
                </div>
                <div className="newMainContainer py-3 ps-3 d-flex bg-white">
                  <div className="day me-3">{d.date.slice(-2)}</div>
                  <div className="content">
                    <button
                      className="type mb-1 border-0"
                      onClick={() => {
                        newsFilter(d.category);
                      }}
                    >
                      {d.categoryName}
                    </button>
                    <div className="text">{d.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
