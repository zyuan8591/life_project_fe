import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function Content() {
  return (
    <>
      <section className="section-content">
        {/* ----Official Pincnic---- */}
        <div
          className="wrap wrap1"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <div className="image contentbn1 d-flex ">
            <img
              src="/img/picnic/activity_picnic_img/picnic_main_content2.webp"
              alt="picnic"
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
            <Link to="/activity/picnic/official" className="btn mt-5">
              官方活動
            </Link>
          </div>
        </div>
        {/* ----Private Pincnic---- */}
        <div
          className="wrap wrap2 d-flex"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <div className="image contentbn2 d-flex mb-view d-none">
            <img
              className=""
              src="/img/picnic/activity_picnic_img/picnic_main_content1.jpg"
              alt="picnic"
            />
          </div>
          <div className="content-text d-flex flex-column justify-content-center align-items-center">
            <div className="title align-self-start">Private Pincnic</div>
            <div className="text-p">
              <p>
                節奏明快的臺北步調，用「野餐」享受當下的相聚。
                <br />
                趁著風光明媚的假期，和家人、好友在草地上一同享受野餐之樂。
                <br />
                在這裡，也能找尋自同道合的夥伴！
                <br />
                在這裡，野可以，浪漫一夏！
              </p>
            </div>
            <Link to="/activity/picnic/group" className="btn mt-5">
              私人活動
            </Link>
          </div>
          <div className="image contentbn2 d-flex pc-view">
            <img
              className=""
              src="/img/picnic/activity_picnic_img/picnic_main_content1.jpg"
              alt="picnic"
            />
          </div>
        </div>
        {/* ----Create Pincnic---- */}
        <div
          className="wrap wrap3 d-flex mb-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="image contentbn3 d-flex ">
            <img
              src="/img/picnic/activity_picnic_img/picnic_main_content3.jpeg"
              alt="picnic"
            />
          </div>
          <div className="content-text d-flex flex-column justify-content-center align-items-center">
            <div className="title align-self-start">Create Pincnic</div>
            <div className="text-p">
              <p>
                有多久沒有好好認識身邊的人
                <br />
                讓我們主動牽起人與人相遇的美好
                <br />
                在大自然的浪漫環境下
                <br />
                與朋友、情人、家人一起度過美好時光
                <br />
                快來創造屬於你的任何主題，培養新興趣、認識新朋友，創造一個你有興趣的聚會吧！
              </p>
            </div>
            <Link to="/activity/picnic/create" className="btn mt-5">
              我要揪團
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Content;
