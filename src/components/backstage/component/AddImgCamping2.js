import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';

function AddImgCamping2({ camping, setCamping }) {
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
    setCamping({ ...camping, photo2: file });
    console.log(camping);
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
      <label className="mb-4" htmlFor="photo2">
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
        name="photo2"
        type="file"
        id="photo2"
        onChange={updateImgHandler}
      />
    </>
  );
}

export default AddImgCamping2;
