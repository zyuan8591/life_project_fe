import { IconContext } from 'react-icons';
import { IoIosArrowDropdown } from 'react-icons/io';

function TitleBanner() {
  return (
    <>
      <section className="section-main">
        <div className="banner">
          <img
            src="../../../img/picnic/activity_picnic_img/picnic_detail_banner2.jpeg"
            alt=""
          />
        </div>
        {/* <div className="d-flex">
          <div className="title-bn">
            <img
              src="../../../img/picnic/activity_picnic_img/picnic_index_banner01.webp"
              alt=""
            />
            <img
              className="balloon1"
              src="/img/picnic/activity_picnic_img/picnic_index_banner1-1.png"
              alt=""
            />
            <img
              className="balloon2"
              src="/img/picnic/activity_picnic_img/picnic_index_banner1-2.png"
              alt=""
            />
          </div>
          <div className="title-text">
            <div className="title-slogan">
              <span>P</span>
              <span>I</span>
              <span>C</span>
              <span>N</span>
              <span>I</span>
              <span>C</span>
            </div>
            <div className="title-slogan2">
              <div className="first-child">給生活中繁忙的自己，</div>
              <div className="last-child">一個草地上的微旅行。</div>
            </div>
            <IoIosArrowDropdown className="iconArrowDropdown" />
          </div>
        </div> */}
      </section>
    </>
  );
}

export default TitleBanner;
