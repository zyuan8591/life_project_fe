import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconContext } from 'react-icons';
import { IoWarning } from 'react-icons/io5';
import { HiLightBulb } from 'react-icons/hi';
import { FaHandPointRight } from 'react-icons/fa';
import classes from '../../../../styles/moduleCss/camping_detail_page/CampingDetailInfo.module.scss';
function CampingDetailInfo({ aboutDetail, aboutIcon, v }) {
  return (
    <>
      <div className={classes.aboutContainer}>
        <div className={classes.about}>
          <div className={classes.aboutTitle}>關於</div>
          <div className={classes.aboutDetail}>{v.activity_about}</div>
        </div>
        <div className={classes.about}>
          <div className={classes.aboutTitle}>住宿</div>
          <div className={classes.aboutDetail}>
            {v.activity_lodging} <br />
            <IconContext.Provider value={{ color: '#F2AC33', size: '1.3rem' }}>
              <div className={classes.aboutText}>
                <IoWarning />
                <span className="ms-1" style={{ fontSize: '14px' }}>
                  提醒您～活動為隨機分房不得選擇
                </span>
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <IconContext.Provider value={{ color: '#F2AC33', size: '1.2rem' }}>
          <div className={classes.about}>
            <div className={classes.aboutTitle}>服務與措施</div>
            <div className={classes.aboutDetail}>
              <IconContext.Provider value={{ color: '#444', size: '1.4rem' }}>
                {aboutIcon.map((v) => {
                  return (
                    <div
                      className="d-flex align-items-center mb-2"
                      key={uuidv4()}
                    >
                      <v.icon />
                      <span className="ms-1">{v.iconTitle}</span>
                    </div>
                  );
                })}
              </IconContext.Provider>
            </div>
          </div>
          <div className={classes.about}>
            <div className={classes.aboutTitle}>行程介紹</div>
            <div className={classes.aboutDetail}>
              <div className={classes.aboutText}>
                <FaHandPointRight className="me-2" />
                <div className={classes.textTitle}>Day 1</div>
              </div>
              <div className="ms-4">
                16:00 - 16:30 星際碼頭集合報到 <br />
                16:30 - 17:00 人力推行器，前進好夢里 <br />
                17:00 - 18:30 能量補充，樹屋探險 <br />
                18:30 - 20:00 來自地心的獵人主廚晚餐 <br />
                20:00 - 20:40 太空夢遊趣 <br />
                20:40 - 天地間造夢 <br />
              </div>
              <div className={classes.aboutText}>
                <FaHandPointRight className="me-2" />
                <div className={classes.textTitle}>Day 2</div>
              </div>
              <div className="ms-4">
                07:30 - 09:30 晨食白日夢 <br />
                09:30 - 10:30 星際迷走，遺跡探索 <br />
                10:30 - 11:30 野地廚房，我是地球好野人
                <br />
                1130- 再見好夢里
              </div>
            </div>
          </div>
          <div className={classes.about}>
            <div className={classes.aboutTitle}>注意事項</div>
            <div className={classes.aboutDetail}>
              {aboutDetail.map((v) => {
                return (
                  <div key={uuidv4()}>
                    <div className={classes.aboutText}>
                      <HiLightBulb className="me-2" />
                      <div className={classes.textTitle}>{v.detailTitle}</div>
                    </div>
                    <div className="ms-4">{v.detailText}</div>
                  </div>
                );
              })}
              <div>
                <div className={classes.aboutText}>
                  <HiLightBulb className="me-2" />
                  <div className={classes.textTitle}>入住注意項項</div>
                </div>
                <div className="ms-4">
                  1. 為維護旅程品質，請勿攜帶寵物。導盲犬除外。帳篷內禁止飲食。
                  <br />
                  2.
                  為保障體驗期間村民與場域安全，場域內禁止村民使用明火、仙女棒、煤油爐、氣化燈、瓦斯爐等明火器材。
                  <br />
                  3.
                  帳篷內禁止使用高瓦數電器設備，如吹風機、電熱器、電捲棒、電磁爐、電毯、快煮壺。
                  <br />
                  4.
                  ​勤美學為維護體驗品質與其他客人權益，場域內音量將受管理，未經許可禁止在勤美學場域內使用擴音設備或大聲喧嘩。
                </div>
              </div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default CampingDetailInfo;
