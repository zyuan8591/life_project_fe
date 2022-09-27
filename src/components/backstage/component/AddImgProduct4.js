import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';

const AddImgProduct4 = ({ i, product, setProduct }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

  function handleUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    // check image type
    if (!file.type.match(imageMimeType)) {
      console.error('Image mime type is not valid');
      return;
    }

    setFile(file);
    setProduct({ ...product, photo4: file });
    console.log(product);
  }
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
      <label className="mb-4" htmlFor="photo4" key={i}>
      {fileDataURL ? (
          <figure className="m-0 campingImg me-4">
            <img src={fileDataURL} alt="/" className="objectCover" />
          </figure>
        ) : (
          <div className="d-flex flex-column align-items-center imgInput me-4">
            <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
              <AiOutlineCamera />
            </IconContext.Provider>
            <span>點擊新增圖片</span>
          </div>
        )}
      </label>
      <input
        className="input d-none"
        name="photo4"
        type="file"
        id="photo4"
        onChange={handleUpload}
      />
    </>
  );
};

export default AddImgProduct4;