import React from 'react';
import CardSm from '../../public_component/CardSm';

const IndexProducts = () => {
  return (
    <div>
      <CardSm
        title="05.28 上架"
        type="TOSHIBA"
        name="AA_5566烤箱"
        img={`/img/product/product_img/kolin_KBO_LN102_01.jpg`}
        link="/products/1"
      />
    </div>
  );
};

export default IndexProducts;
