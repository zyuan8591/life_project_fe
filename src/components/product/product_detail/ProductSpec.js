import React from 'react';

const ProductSpec = ({ spec }) => {
  console.log(spec);
  return (
    <div>
      {spec.split('：').map((v, i) => {
        return (
          <>
            <p className="p mb-1 fw-semibold" key={i}>{v.replace(':', '：')}</p>
          </>
        );
      })}
    </div>
  );
};

export default ProductSpec;
