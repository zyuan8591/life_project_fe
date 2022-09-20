import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaQuoteLeft,
  FaQuoteRight,
} from 'react-icons/fa';

function OffcialDetailContent({ data }) {
  // console.log(data);
  return (
    <>
      <div className="offcialDetailContent">
        {/* --- 活動內容 --- */}
        {data.map((item) => {
          return (
            <div className="contentWrap1 mb-5" key={uuidv4()}>
              {/* <h4 className="contentTitle">活動內容</h4> */}
              <p>
                <FaQuoteLeft className="quoteLeftIcon" />
                {item.intr}
                <FaQuoteRight className="quoteRightIcon" />
              </p>
            </div>
          );
        })}
        {/* --- 購買須知 --- */}
        <div className="mb-5">
          <h4 className="contentTitle">購買須知</h4>
          <ul>
            <li>
              <FaExclamationTriangle className="warnIcon" />
              若因天氣等不可抗力之因素，或受其他安全考量等因素所迫，而導致活動無法順利進行，活動小組將有權決定取消活動或延期舉行，同時以電話或簡訊主動告知參與者。活動如因上述因素而被迫取消，將全額退費，退費辦法將另行公告。
            </li>
            <li>
              <FaExclamationTriangle className="warnIcon" />
              成團條件：5人(含)以上，上限依每個活動規定人數
            </li>
            <li>
              <FaExclamationTriangle className="warnIcon" />
              如有特殊需求，如：同行人中有幼童、行動不便的長者等等，請來電或來信詢問，勿先行下單
            </li>
            <li>
              <FaExclamationTriangle className="warnIcon" />
              活動不包含交通，請自行前往集合點集合。
            </li>
          </ul>
        </div>
        {/* --- 費用 --- */}
        <div className="mb-5">
          <h4 className="contentTitle">費用包含/不包含</h4>
          <div className="d-flex ">
            <ul>
              <li>
                <FaCheck className="checkIcon" />
                餐費
              </li>
              <li>
                <FaCheck className="checkIcon" />
                野餐裝備
              </li>
              <li>
                <FaCheck className="checkIcon" />
                服務費
              </li>
              <li>
                <FaCheck className="checkIcon" />
                保險
              </li>
            </ul>
            <ul className="ms-4">
              <li>
                <FaTimes className="crossIcon" />
                個人消費
              </li>
              <li>
                <FaTimes className="crossIcon" />
                其他未提及費用
              </li>
            </ul>
          </div>
        </div>
        {/* --- 注意事項 --- */}
        <div className="mb-5 noticeItem">
          <h4 className="noticeItemTitle">注意事項</h4>
          <ul>
            <li>
              ・最少出團人數 5
              人，當參加人數未達上述規定的最少成團人數時，將取消旅遊行程，於出發日前
              7 天發出取消旅遊的簡訊通知。
            </li>
            <li>
              ・若遇颱風、暴風雪等天候不佳的情況，將於出發前 1 天（當地時間
              20:00 ）決定此團是否取消出發，之後將隨時以簡訊形式通知。
            </li>
            <li>・防疫期間，請依循中央疫情指揮中心之防疫措施。</li>
            <li>・假日遊客眾多，停車場車位有限，建議提早出門避開尖峰時段。</li>
            <li>
              ・主辦單位保留最終核准與否及活動變更／修改或終止本活動之權力，恕不另行通知。
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default OffcialDetailContent;
