import React from 'react';
import { IconContext } from 'react-icons';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

import classes from '../../../../styles/moduleCss/camping_detail_page/CampingDetailAside.module.scss';

function CampingDetailAside({
  scrollDown,
  v,
  stateClassName,
  dataReplace,
  joinPep,
}) {
  const stateBtn = (state) => {
    if (state === '已成團') return '已成團';
    if (state === '開團中') return '加入活動';
    return state;
  };

  return (
    <>
      <aside className={scrollDown ? 'sticky-top top-0' : classes.sticky}>
        <div className={classes.asideTitle}>
          <div className={classes.titleName}>{v.title}</div>
          <div
            className={classes.state}
            style={{
              backgroundColor: `${stateClassName(v.state)}`,
            }}
          >
            {v.state}
          </div>
        </div>
        <div className={classes.asidePrice}>NT${v.price}</div>
        <div className={classes.asideContent}>
          <div className={classes.contentItem}>
            <FaCalendarAlt />
            <div className="ms-3">
              {dataReplace(v.activity_start_date)} ~
              {dataReplace(v.activity_end_date)}
            </div>
          </div>
          <IconContext.Provider value={{ color: '#444', size: '1.3rem' }}>
            <div className={classes.contentItem}>
              <MdLocationOn />
              <div className="ms-3">{v.address}</div>
            </div>
            <div className={classes.contentItem}>
              <BsPersonFill />
              <div className="ms-3">尚可參加人數：{joinPep()}</div>
            </div>
          </IconContext.Provider>
        </div>
        <div className={classes.asideMap}>map</div>
        <div className="text-center">
          {/* TODO:已報名---取消報名 */}
          {/* TODO:更換成icon? */}
          <button
            className={
              v.state !== '開團中' ? classes.disabledBtn : classes.joinBtn
            }
            disabled={v.state !== '開團中' ? true : false}
          >
            {stateBtn(v.state)}
          </button>
        </div>
      </aside>
    </>
  );
}

export default CampingDetailAside;
