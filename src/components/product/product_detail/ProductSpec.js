import React from 'react';

const ProductSpec = () => {
  const spec =
    '品牌:其他品牌  型號:BOE021  產地:中國內部  材質:鋼材  商品尺寸(材積):W37.5 x D23.5 x H14cm  電壓:110V  頻率:60Hz  產品重量:2.3kg  容量:20L以下  保固:1年配件:電源線、章魚燒烤盤、平盤、木匙  電源線長:約180cm  消耗功率:1100~1200W  BSMI:BSMI  識別碼：R64875  證書號碼：CI319063102882 號00';
  return (
    <div>
      {spec.split('  ').map((v, i) => {
        return (
          <>
            <p className="p mb-1 fw-semibold">{v.replace(':', '：')}</p>
          </>
        );
      })}
    </div>
  );
};

export default ProductSpec;
