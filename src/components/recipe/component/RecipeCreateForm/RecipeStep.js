import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TbTrash, TbMenu2 } from 'react-icons/tb';
import { AiOutlinePlus, AiOutlineCamera } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const container = css`
  display: grid;
  grid-template-columns: 3fr 7fr;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  gap: 1rem;
`;
const imgContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eee;
  border-radius: 3px;
`;

const RecipeStep = ({ i, delStep, addStep, changeStep, data, demo, edit }) => {
  const [content, setContent] = useState('');
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (demo || edit) {
      setContent(data.content);
      setLength(data.content.length);
    }
  }, []);

  // preview file
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

  // recipe img handler
  const updateImgHandler = (e) => {
    const file = e.target.files[0];
    // check image type
    if (!file.type.match(imageMimeType)) {
      console.error('Image mime type is not valid');
      return;
    }
    setFile(file);
    changeStep(file, i, 'img');
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
    <div css={container}>
      {/* img input */}
      <label
        htmlFor={`recipeStepImg${i}`}
        css={imgContainer}
        className="cursorPointer"
      >
        {fileDataURL || edit ? (
          <img src={fileDataURL || data.img} alt="prev" className="w-100" />
        ) : (
          <>
            <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
              <AiOutlineCamera />
            </IconContext.Provider>
            <span>點擊新增圖片</span>
          </>
        )}
      </label>
      <input
        type="file"
        className="d-none"
        id={`recipeStepImg${i}`}
        onChange={(e) => {
          updateImgHandler(e);
        }}
      />
      {/* right section */}
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">{i + 1}</span>
          <div className="d-flex gap-1">
            <IconContext.Provider
              value={{
                color: '#444',
                size: '1.5rem',
                className: 'cursorPointer',
              }}
            >
              <div onClick={() => addStep(i)}>
                <AiOutlinePlus />
              </div>
              <div onClick={() => delStep(i)}>
                <TbTrash />
              </div>
              <div>
                <TbMenu2 />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <textarea
          placeholder="請輸入步驟說明 (最多 150 字)"
          rows="4"
          cols="auto"
          value={content}
          onChange={(e) => {
            if (e.target.value.length > 150) return;
            setLength(e.target.value.length);
            changeStep(e.target.value, i, 'content');
            setContent(e.target.value);
          }}
        />
        <span className="align-self-end">{length}/150</span>
      </div>
    </div>
  );
};

export default RecipeStep;
