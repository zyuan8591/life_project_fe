import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


function Paicipant() {
  return (
    <>
      <div className="paicipant ">
        <div>
        <h4>參加者(7/25)</h4>
        {/* <span>先來認識大家</span> */}
        </div>
        <div className="userItems d-flex">
          <IoIosArrowBack className="arrowIcon flex-shrink-" />
          <div className="paicipantCard">
            <div className="avatar">
              <img
                src=""
                alt=""
              />
            </div>
            <div className="my-2">hello</div>
          </div>
          <div className="paicipantCard">
            <div className="avatar">
              <img
                src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                alt=""
              />
            </div>
            <div className="my-2">hello</div>
          </div>
          <div className="paicipantCard">
            <div className="avatar">
              <img
                src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
                alt=""
              />
            </div>
            <div className="my-2">hello</div>
          </div>
          <IoIosArrowForward className="arrowIcon ms-auto flex-shrink-" />
        </div>
      </div>
    </>
  );
}

export default Paicipant;
