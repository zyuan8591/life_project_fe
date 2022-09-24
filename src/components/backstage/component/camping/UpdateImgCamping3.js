import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineCamera } from 'react-icons/ai';

function UpdateImgCamping3({ camping, setCamping }) {
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
    setCamping({ ...camping, photo3: file });
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
      <label className="mb-4" htmlFor="photo3">
        {fileDataURL ? (
          <figure className="m-0 campingImg">
            <img src={fileDataURL} alt="/" className="objectCover" />
          </figure>
        ) : (
          <figure className="m-0 campingImg">
            <img
              src={`/img/camping/activity_camping_img/${camping.photo3}`}
              alt="/"
              className="objectCover"
            />
          </figure>
        )}
      </label>
      <input
        className="input d-none"
        name="photo3"
        type="file"
        id="photo3"
        onChange={updateImgHandler}
      />
    </>
  );
}

export default UpdateImgCamping3;
