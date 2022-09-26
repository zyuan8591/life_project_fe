import React from 'react';
import { useProductCart } from '../../../../orderContetxt/useProductCart';
import { usePicnicCart } from '../../../../orderContetxt/usePicnicCart';
import { useCampingCart } from '../../../../orderContetxt/useCampingCart';

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
}) => {
  // console.log(point);
  // console.log(productTotal, picnicTotal, campingTotal);

  return (
    <>
      <div className="summary">
        <h2 className="h1 ps-3 text-center">付款摘要</h2>
        <hr />
        <div>共 {productCount + picnicCount + campingCount} 項目</div>

        <div className="row gap-3">
          <div className="col">總計：</div>
          <div className="col-md-2 col-3">
            $ {productTotal + picnicTotal + campingTotal} 元
          </div>
        </div>

        {/* TODO: 點數 */}
        <div className="row gap-3 align-items-center">
          <div className="col">LIFE點數(現有:{point})：</div>
          <div className="col-2">
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
          </div>
        </div>
        <div className="row gap-3 text-danger ">
          <div className="col">折扣金額：</div>
          <div className="col-2 px-1"> {-usePoint}</div>
        </div>
        <div className="row gap-3 mt-3">
          <div className="col h5">應付金額：</div>
          <div className="col-2 h5">
            $ {productTotal + picnicTotal + campingTotal - usePoint} 元
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
