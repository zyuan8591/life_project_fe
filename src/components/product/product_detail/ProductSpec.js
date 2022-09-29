import React, { useState } from 'react';

const ProductSpec = ({ spec }) => {
  let specContent = spec.split('/').map((v, i) => {
    return v;
  });

  return (
    <div>
      {specContent.map((v, i) => {
        return (
          <p className="p mb-1 fw-semibold" key={i}>
            {v}
          </p>
        );
      })}
    </div>
  );
};

export default ProductSpec;
