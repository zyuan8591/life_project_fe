function TitleBanner() {
  return (
    <>
      <section className="section-main">
        <div className="title-bn">
          <img
            src="../../../img/picnic/activity_picnic_img/picnic_index_banner1.png"
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
            <p className="first-child">給生活中繁忙的自己，</p>
            <p className="last-child">一個草地上的微旅行。</p>
          </div>
          <div>
            {/* <IconContext.Provider value={{ color: '#444', size: '4rem' }}>
                <IoIosArrowDropdown className="icon-ArrowDropdown" />
              </IconContext.Provider> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default TitleBanner;
