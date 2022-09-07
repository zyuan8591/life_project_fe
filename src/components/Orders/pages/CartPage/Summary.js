import React from 'react';

const Summary = (props) => {
  return (
    <>
      <h2 className="h1 ps-3 pb-2 text-center">付款摘要</h2>
      <hr />

      <div className="row summary">
        <div className="row text-end">
          <div className="col">共 0 項目</div>
        </div>
        <div className="row">
          <div className="row text-end">
            <div className="col-10">總計：</div>
            <div className="col">$ 8,787</div>
          </div>
          <div className="row text-end ">
            <div className="col-10">LIFE點數(現有:265)：</div>
            <div className="col-2">
              100
              {/* <select>
                <option value={100} />
              </select> */}
            </div>
          </div>
          <div className="row text-end text-danger ">
            <div className="col-10">折扣金額：</div>
            <div className="col">-100</div>
          </div>
          <div className="row text-end">
            <div className="col-10">應付金額：</div>
            <div className="col">$ 8,687</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
