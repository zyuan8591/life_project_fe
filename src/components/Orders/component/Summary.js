import React from 'react';

const Summary = (props) => {
  return (
    <>
      <h2 className="h1 ps-3 pb-2 text-center">付款摘要</h2>
      <hr />
      <div className="row summary">
        <div className="row text-center">
          <div className="col">共 0 項目</div>
        </div>
        <div className="row text-center">
          <div className="col-4"></div>
          <div className="col-2 text-end">總計：</div>
          <div className="col text-end">$ 8,787</div>
          <div className="col-5"></div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-2 text-end">LIFE點數： </div>
          <div className="col text-end">10</div>
          <div className="col-5"></div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-2 text-end">折扣金額： </div>
          <div className="col text-end">-100</div>
          <div className="col-5"></div>
        </div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-2 text-end">應付金額： </div>
          <div className="col text-end">$ 8,687</div>
          <div className="col-5"></div>
        </div>
      </div>
    </>
  );
};

export default Summary;
