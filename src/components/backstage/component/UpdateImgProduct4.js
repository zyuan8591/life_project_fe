import React, { useState, useEffect } from 'react';
import { API_URL_IMG } from '../../../utils/config';
const UpdateImgProduct4 = ({ product, setProduct, detailImg }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;
  const updateImgHandler = (e) => {
    const file = e.target.files[0];

    // check image type
    if (!file.type.match(imageMimeType)) {
      console.error('Image mime type is not valid');
      return;
    }

    setFile(file);
    setProduct({ ...product, photo4: file });
    console.log(product, file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      // get image url
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    // unmounting
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return (
    <>
      <label className="mb-4" htmlFor="photo4">
        {fileDataURL ? (
          <figure className="m-0 campingImg me-4">
            <img src={fileDataURL} alt="/" className="objectCover" />
          </figure>
        ) : (
          <figure className="m-0 campingImg me-4">
            <img
              src={`${API_URL_IMG}/product/product_detail_img/${detailImg.img}`}
              alt="/"
              className="objectCover"
            />
          </figure>
        )}
      </label>
      <input
        className="input d-none"
        name="photo4"
        type="file"
        id="photo4"
        onChange={updateImgHandler}
      />
    </>
  );
};

export default UpdateImgProduct4;
