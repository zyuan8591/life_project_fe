import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FaExclamationTriangle,
  FaQuoteLeft,
  FaQuoteRight,
} from 'react-icons/fa';

function PrivateDetailContent({ data }) {
  return (
    <>
      {/* --- 活動內容 --- */}
      <div className="privateDetailContent ">
        {data.map((data) => {
          return (
            <div className="contentWrap1 mb-5" key={data.id}>
              {/* <h4 className="contentTitle">活動內容</h4> */}
              <p>
                <FaQuoteLeft className="quoteLeftIcon" />
                {data.intr}
                <FaQuoteRight className="quoteRightIcon" />
              </p>
            </div>
          );
        })}
        {/* --- 活動須知 --- */}
        <div className="contentWrap2 mb-5">
          <h4 className="contentTitle">活動須知</h4>
          <div>
            <p className="mt-4 mb-2">
              <FaExclamationTriangle className="warnIcon" />
              現場道具租借：
            </p>
            <ul>
              <li>
                1.
                現場有道具租借服務，租借時間每一時段為3個半小時為限，上、下午場歸還時間分別為12:30、17:00。
              </li>
              <li>
                2.
                野餐道具組價值4,000元整；領取時會收取押金1,000元。歸還道具時，檢查沒問題就會當場退還。
              </li>
              <li>
                3.
                野餐道具若完全性損壞、遺失，請照價賠償該物品價格，押金亦不予歸還，請務必好好愛惜！
              </li>
              <li>4. 歸還地點於留夏換氣站，也就是您領取野餐道具組的地方。</li>
            </ul>
          </div>
          <div>
            <p className="mt-4 mb-2">
              <FaExclamationTriangle className="warnIcon" />
              注意事項：
            </p>
            <ul>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                1.
                若因天氣等不可抗力之因素，或受其他安全考量等因素所迫，而導致活動無法順利進行，主辦人將有權決定取消活動或延期舉行，同時主動告知參與者。
              </li>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                2. 成團條件：2人(含)以上
              </li>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                3. 費用為主辦人預估當天個人花費。
              </li>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                4.
                如有特殊需求，如：同行人中有幼童、行動不便的長者等等，請先詢問主辦人。
              </li>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                5. 活動不包含交通，請自行前往集合點集合。
              </li>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                6. 防疫期間，請依循中央疫情指揮中心之防疫措施
              </li>
              <li>
                {/* <FaExclamationTriangle className="warnIcon" /> */}
                7. 主辦單位不承擔私人出團的個人行為、現場意外、財產及生命損失！
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateDetailContent;
