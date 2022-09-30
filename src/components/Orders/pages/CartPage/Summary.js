import React from 'react';

const Summary = ({
  point,
  usePoint = 0,
  setUsePoint,
  productCount,
  picnicCount,
  campingCount,
  productTotal = 0,
  picnicTotal = 0,
  campingTotal = 0,
  currentStep,
}) => {
  // console.log(point);
  // console.log(productTotal, picnicTotal, campingTotal);

  return (
    <>
      <div className="summary">
        <h2 className="h1 ps-3 text-center">付款摘要</h2>
        <hr />
        <p>共 {productCount + picnicCount + campingCount} 項目</p>

        <div className="row gap-3">
          <div className="col">總計：</div>
          <div className="col-md-2 col">
            ${' '}
            {JSON.stringify(productTotal + picnicTotal + campingTotal).replace(
              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
              ','
            )}{' '}
          </div>
        </div>

        {/* TODO: 點數 */}
        <div className="row gap-3 align-items-center ">
          {currentStep === 1 ? (
            <div className="col">LIFE點數(現有:{point})：</div>
          ) : (
            <div className="col">LIFE點數：</div>
          )}

          <div className="col-md-2 col">
            {currentStep === 1 ? (
              <input
                type="text"
                value={usePoint}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d]/, '');
                  console.log('e', value);
                  if (value > point) return;
                  setUsePoint(parseInt(value || 0));
                  localStorage.setItem('usePoint', e.target.value);
                }}
              />
            ) : (
              <div>
                {localStorage.getItem('usePoint', usePoint) || 0 || usePoint}
              </div>
            )}
          </div>
        </div>
        <div className="row gap-3 text-danger ">
          <div className="col">折扣金額：</div>
          {currentStep === 1 ? (
            <div className="col-md-2 col "> {-usePoint}</div>
          ) : (
            <div className="col-md-2 col">
              {-localStorage.getItem('usePoint', usePoint)}
            </div>
          )}
        </div>
        <div className="row gap-3 mt-3">
          <div className="col h5">應付金額：</div>
          <div className="col-md-2 col h5">
            ${' '}
            {JSON.stringify(
              productTotal +
                picnicTotal +
                campingTotal -
                (localStorage.getItem('usePoint', usePoint) || -usePoint)
            ).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
