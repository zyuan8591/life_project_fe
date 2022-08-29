import React from 'react';
import '../../../styles/picnic/_picnicIndex.scss';
import { IconContext } from 'react-icons';
import { IoIosArrowDropdown } from 'react-icons/io';
import TitleBanner from './TitleBanner';

function PicnicIndex() {
  return (
    <>
      <main className="main ">
        {/* section main banner */}
        <TitleBanner />
        <section className="section-content">
          <div className="wrap wrap1 d-flex">
            <div className="image d-flex ">
              <img
                src="/img/picnic/activity_picnic_img/picnic_main_content1.jpg"
                alt=""
              />
            </div>
            <div className="content-text d-flex flex-column justify-content-center align-items-center">
              <div className="title align-self-start">Official Pincnic</div>
              <div className="text-p">
                <p>
                  旅行的意義，不見得是去了哪裡，而是和誰一起。
                  <br />
                  旅行的節目，未必要安排的緊湊，重點是能讓心靈喘口氣。
                  <br />
                  只要抓著一條野餐墊牽起愛人的手，走出門。
                  <br />
                  給親愛的家人們一個草地上的微旅行。
                  <br />
                  所有的東西事情由我們規劃準備，
                  <br />
                  親愛的你/妳，只要搭上捷運，或者騎騎UBIKE到全台北市最美麗的綠地。
                </p>
              </div>
              <button className="btn mt-5">官方活動</button>
            </div>
          </div>
          <div className="wrap wrap2 d-flex">
            <div className="content-text d-flex flex-column justify-content-center align-items-center">
              <div className="title align-self-start">Private Pincnic</div>
              <div className="text-p">
                <p>
                  節奏明快的臺北步調，用「野餐」享受當下與親友相聚，
                  <br />
                  趁著風光明媚的假期，和家人、好友在草地上一同享受野餐之樂。
                  <br />
                  在這裡，野可以，浪漫一夏！
                </p>
              </div>
              <button className="btn mt-5">私人活動</button>
            </div>
            <div className="image d-flex">
              <img
                className=""
                src="/img/picnic/activity_picnic_img/picnic_main_content2.webp"
                alt=""
              />
            </div>
          </div>
          {/*  */}
          <div className="wrap wrap3 d-flex">
            <div className="image d-flex ">
              <img
                src="/img/picnic/activity_picnic_img/picnic_main_content3.jpg"
                alt=""
              />
            </div>
            <div className="content-text d-flex flex-column justify-content-center align-items-center">
              <div className="title align-self-start">Create Pincnic</div>
              <div className="text-p">
                <p>
                  旅行的意義，不見得是去了哪裡，而是和誰一起。
                  <br />
                  旅行的節目，未必要安排的緊湊，重點是能讓心靈喘口氣。
                  <br />
                  只要抓著一條野餐墊牽起愛人的手，走出門。
                  <br />
                  給親愛的家人們一個草地上的微旅行。
                  <br />
                  所有的東西事情由我們規劃準備，
                  <br />
                  親愛的你/妳，只要搭上捷運，或者騎騎UBIKE到全台北市最美麗的綠地。
                </p>
              </div>
              <button className="btn mt-5">我要揪團</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PicnicIndex;
