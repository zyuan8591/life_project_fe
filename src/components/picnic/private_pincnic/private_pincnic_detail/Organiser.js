import React from 'react';
import { useState } from 'react';
import { API_URL_IMG } from '../../../../utils/config';
import { v4 as uuidv4 } from 'uuid';

function Organiser({ organiserData, setOrganiserData }) {
  // console.log(organiserData);
  return (
    <>
      {organiserData.map((organiserData) => {
        return (
          <div className="organiser" key={uuidv4()}>
            <div className="avatar">
              <div className="avatarImg">
                <img src={`${API_URL_IMG}${organiserData.photo}`} alt="" />
              </div>
              <div className="w-100">
                <span>主辦人</span>
                <br />
                <span>{organiserData.name}</span>
              </div>
            </div>
            <div className="info">
              <p>{organiserData.intro}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Organiser;
