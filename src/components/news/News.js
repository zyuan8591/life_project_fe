import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_URL } from '../../utils/config';
import '../../styles/_news.scss';
import axios from 'axios';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsCate, setNewsCate] = useState([]);
  const [cateNow, setCateNow] = useState(0);

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
    (async () => {
      let data = await axios.get(`${API_URL}/news/category`);
      setNewsCate(data.data);
    })();
  }, []);

  let newsCateArr = newsCate.map((d) => (
    <li
      key={d.id}
      onClick={() => {
        newsFilter(d.id);
        setCateNow(d.id);
      }}
      className={`cursorPointer transition ${cateNow === d.id ? 'active' : ''}`}
    >
      {d.name}
    </li>
  ));

  // get filter data
  const newsFilter = async (cate) => {
    getData(`/news?cate=${cate}`);
  };

  return (
    <>
      <div className="newsPage">
        {/* news title */}
        <div
          className="title cursorPointer"
          onClick={() => {
            getData('/news');
            setCateNow(0);
          }}
        >
          <span className="en">最新消息</span>
          <span className="ch">WHAT'S NEW</span>
        </div>
        <ul className="d-flex newsCate p-0 mt-3 mb-0 gap-2">{newsCateArr}</ul>

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
                        setCateNow(d.category);
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
